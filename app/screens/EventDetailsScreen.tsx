import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useUser } from '../context/UserContext';
import { joinEvent, updateAttendance, getEventParticipants } from '../services/eventService';

const EventDetailsScreen = ({ route }: any) => {
    const { user } = useUser();
    const { event } = route.params;
    const [status, setStatus] = useState<string>('attending');

    const handleJoinEvent = async () => {
        await joinEvent(event.id, user?.id, status);
        alert('Joined event!');
    };

    const handleUpdateStatus = async (newStatus: string) => {
        setStatus(newStatus);
        await updateAttendance(event.id, user?.id, newStatus);
        alert(`Status updated to ${newStatus}`);
    };

    return (
        <View>
            <Text>{event.title}</Text>
            <Text>{event.date}</Text>
            <Text>{event.time}</Text>
            <Button title="Join Event" onPress={handleJoinEvent} />
            <Button title="Attending" onPress={() => handleUpdateStatus('attending')} />
            <Button title="Not Attending" onPress={() => handleUpdateStatus('not attending')} />
            <Button title="Maybe" onPress={() => handleUpdateStatus('maybe')} />
        </View>
    );
};

export default EventDetailsScreen;
