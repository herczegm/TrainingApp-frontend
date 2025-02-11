import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { createTeam } from "../services/teamService";
import { useUser } from "../context/UserContext";

export default function CreateTeamScreen({ navigation }: any) {
    const [teamName, setTeamName] = useState('');
    const [teamCode, setTeamCode] = useState('');
    const { user } = useUser();

    const handleCreateTeam = async () => {
        if (!user) {
            Alert.alert('Error', 'User is not logged in');
            return;
        }
        if (!teamName || !teamCode) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        try {
            const newTeam = await createTeam(teamName, teamCode, user.auth_id);
            Alert.alert('Success', `Team "${newTeam.name}" created succesfully!`);
            navigation.navigate('Home');
        } catch {
            Alert.alert('Error', 'Failed to create team.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create a New Team</Text>
            <TextInput
                style={styles.input}
                placeholder="Team Name"
                value={teamName}
                onChangeText={setTeamName} 
            />
            <TextInput
                style={styles.input}
                placeholder="Team Code"
                value={teamCode}
                onChangeText={setTeamCode} 
            />
            <Button title="Create Team" onPress={handleCreateTeam} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 8,
      marginBottom: 16,
    },
  });