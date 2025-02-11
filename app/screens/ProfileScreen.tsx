import React, { useEffect, useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useUser } from '../context/UserContext';
import { getUserProfile, updatedUserProfile } from "../services/userService";
import { joinTeam, leaveTeam } from "../services/teamService";

const ProfileScreen = () => {
    const { user, setUser } = useUser();
    const [profile, setProfile] = useState({ name: '', email: '', team_id: null });
    const [teamCode, setTeamCode] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetchProfile(user.id);
        }
    }, [user]);

    const fetchProfile = async (userId: number) => {
        try {
            const data = await getUserProfile(userId);
            setProfile({ name: data.name, email: data.email, team_id: data.team_id });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (user){
                await updatedUserProfile(user.id, profile.name, profile.email);
                Alert.alert('Success', 'Profile updated successfully');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleJoinTeam = async () => {
        if (!teamCode) {
            Alert.alert('Error', 'Please enter a team code');
            return;
        }
        try {
            if (user){
                const response = await joinTeam(user.id, teamCode);
                if (response.error) {
                    Alert.alert('Error', response.error);
                } else {
                    setProfile({ ...profile, team_id: response.teamId });
                    setUser({ ...user, team_id: response.teamId });
                    Alert.alert('Success', 'You joined the team!');
                }
            }
        } catch (error) {
            console.error('Error joining team:', error);
        }
    };

    const handleLeaveTeam = async () => {
        try {
            if (user){
                await leaveTeam(user.id);
                setProfile({ ...profile, team_id: null });
                setUser({ ...user, team_id: null });
                Alert.alert('Success', 'You left the team!');
            }
        } catch (error) {
            console.error('Error leaving team:', error);
        }
    };

    if (loading) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) => setProfile({ ...profile, name: text })}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(text) => setProfile({ ...profile, email: text })}
                placeholder="Email"
                keyboardType="email-address"
            />
            <Button title="Save Changes" onPress={handleSave} />

            {profile.team_id ? (
                <>
                    <Text>Current Team: {profile.team_id}</Text>
                    <Button title="Leave Team" onPress={handleLeaveTeam} />
                </>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Team Code"
                        value={teamCode}
                        onChangeText={setTeamCode}
                    />
                    <Button title="Join Team" onPress={handleJoinTeam} />
                </>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
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

export default ProfileScreen;