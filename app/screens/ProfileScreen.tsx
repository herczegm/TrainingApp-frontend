import React, { useEffect, useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useUser } from '../context/UserContext';
import { getUserProfile, updatedUserProfile } from "../services/userService";

const ProfileScreen = () => {
    const { user } = useUser();
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetchProfile(user.id);
        }
    }, [user]);

    const fetchProfile = async (userId: number) => {
        try {
            const data = await getUserProfile(userId);
            setProfile({ name: data.name, email: data.email });
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