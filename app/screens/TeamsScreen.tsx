import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';

interface Team {
  id: string;
  name: string;
}

export default function TeamsScreen() {
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: 'Team A' },
    { id: '2', name: 'Team B' },
  ]);
  const [newTeamName, setNewTeamName] = useState('');

  const addTeam = () => {
    if (newTeamName.trim()) {
      setTeams([...teams, { id: Date.now().toString(), name: newTeamName }]);
      setNewTeamName('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teams</Text>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.teamItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter new team name"
        value={newTeamName}
        onChangeText={setNewTeamName}
      />
      <Button title="Add Team" onPress={addTeam} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  teamItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
