import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useUser } from '../context/UserContext';
import AddEventModal from '../components/AddEventModal';
import { getEventsByTeam, addEvent, updateEvent, deleteEvent, joinEvent, updateParticipantStatus, getEventParticipants } from '../services/eventService';
import { AppEvent } from '../models/Event';
import { Picker } from '@react-native-picker/picker';

export interface Participant {
  user_id: number; 
  users:{name: string}; 
  status: string
}

const EventsScreen = () => {
    const { user } = useUser();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    console.log('participants: ', participants);

    // Események betöltése adott csapat alapján
    const fetchEvents = async (date: string) => {
        if (!user?.team_id) return;
        try {
            const allEvents = await getEventsByTeam(user.team_id);
            const filteredEvents = allEvents.filter((event: AppEvent) => event.date === date);
            setEvents(filteredEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchParticipants = async (eventId: number) => {
      try {
        const response = await getEventParticipants(eventId);
        setParticipants(response.participants);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    useEffect(() => {
        fetchEvents(selectedDate);
    }, [selectedDate]);

    // Új esemény hozzáadása
    const handleAddEvent = async (eventData: any) => {
        try {
            const newEvent = { ...eventData, team_id: user?.team_id };
            await addEvent(newEvent);
            fetchEvents(selectedDate);
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    //Csatlakozás az eseményhez
    const handleJoinEvent = async (eventId: number) => {
      if (!user?.id) return;
      
      Alert.alert(
        "Confirm join",
        "Are you sure you want to join this event?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Join",
            onPress: async () => {
              try {
                await joinEvent(eventId, user.id);
                fetchParticipants(eventId);
              } catch (error) {
                console.error('Error joining event:', error);
              }
            },
            style: "default"
          }
        ]
      );
    };

    //Státusz változtatása
    const handleStatusChange = async (eventId: number, userId: number, newStatus: string) => {
      try {
        await updateParticipantStatus(eventId, userId, newStatus);
        fetchParticipants(eventId);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

    // Esemény törlése
    const handleDeleteEvent = (eventId: number) => {
      Alert.alert(
          "Confirm Deletion",
          "Are you sure you want to delete this event?",
          [
              {
                  text: "Cancel",
                  style: "cancel"
              },
              {
                  text: "Delete",
                  onPress: async () => {
                      try {
                          await deleteEvent(eventId);
                          fetchEvents(selectedDate);
                      } catch (error) {
                          console.error('Error deleting event:', error);
                      }
                  },
                  style: "destructive"
              }
          ]
      );
  };

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={(day: any) => setSelectedDate(day.dateString)}
                markedDates={{ [selectedDate]: { selected: true } }}
            />
            <Text style={styles.title}>Events for {selectedDate}</Text>
            <FlatList
                data={events}
                keyExtractor={(item: AppEvent) => item.id.toString()}
                renderItem={({ item: eventItem }: { item: AppEvent }) => (
                    <View style={styles.eventItem}>
                        <Text style={styles.eventTitle}>{eventItem.title}</Text>
                        <Text>{eventItem.time}</Text>
                        <TouchableOpacity onPress={() => handleJoinEvent(eventItem.id)}>
                          <Text style={styles.joinButton}>➕ Join Event</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => fetchParticipants(eventItem.id)}>
                          <Text style={styles.participantsButton}>👥 View Participants</Text>
                        </TouchableOpacity>
                        <FlatList 
                          data={participants} 
                          keyExtractor={(p) => p.user_id.toString()}
                          renderItem={({ item: participant }) => (
                            <View style={styles.participantItem}>
                              <Text> {participant.users.name} - {participant.status} </Text>
                              <Picker 
                                selectedValue={participant.status} 
                                onValueChange={(newStatus) => handleStatusChange(eventItem.id, participant.user_id, newStatus)} 
                                style={styles.picker}
                              >
                                <Picker.Item label="Attending" value="attending" />
                                <Picker.Item label="Not Attending" value="not attending" />
                                <Picker.Item label="Maybe" value="maybe" />
                              </Picker>
                            </View>
                          )}
                        />
                        <TouchableOpacity onPress={() => handleDeleteEvent(eventItem.id)}>
                            <Text style={styles.deleteButton}>🗑 Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <AddEventModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    fetchEvents(selectedDate);
                }}
                onAdd={handleAddEvent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
        textAlign: 'center',
    },
    eventItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    participantItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    picker: {
      height: 40,
      width: 150,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: '50%',
        marginRight: -30,
        backgroundColor: '#007bff',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 30,
        color: 'white',
        lineHeight: 30,
    },
    joinButton: {
      color: 'green',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
    },
    participantsButton: {
      color: '#007bff',
      marginTop: 8,
    },
    deleteButton: {
        color: 'red',
        marginTop: 8,
    },
});

export default EventsScreen;
