import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';

interface AddEventModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (eventData: any) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ visible, onClose, onAdd }) => {
  const [type, setType] = useState<'training' | 'match'>('training');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
  const [time, setTime] = useState('10:00'); // Default idő
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddEvent = () => {
    const eventData = {
      title: type === 'training' ? 'Training' : 'Match',
      type,
      date,
      time,
      location,
      notes,
    };

    onAdd(eventData);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Event</Text>

          {/* Training / Match választó gombok */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, type === 'training' && styles.selectedButton]}
              onPress={() => setType('training')}
            >
              <Text style={styles.buttonText}>Training</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, type === 'match' && styles.selectedButton]}
              onPress={() => setType('match')}
            >
              <Text style={styles.buttonText}>Match</Text>
            </TouchableOpacity>
          </View>

          {/* Dátum mező */}
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={date}
            onChangeText={setDate}
          />

          {/* Idő mező */}
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            value={time}
            onChangeText={setTime}
          />

          {/* Helyszín */}
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />

          {/* Megjegyzések */}
          <TextInput
            style={styles.input}
            placeholder="Notes"
            value={notes}
            onChangeText={setNotes}
          />

          <Button title="Add Event" onPress={handleAddEvent} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  typeButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007bff',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default AddEventModal;
