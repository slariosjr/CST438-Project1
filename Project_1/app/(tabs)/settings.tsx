import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Button, TextInput, Alert, Switch } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { addUser, createDatabase, loginCheck, printAllTables, resetDB, user } from '@/lib/database';
import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';

let db: SQLiteDatabase;

export default function HomeScreen() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [currentTheme, setCurrentTheme] = useState();
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const createDB = async () => {
        await createDatabase();
        db = await openDatabaseAsync('app.db');
        await printAllTables(db);
    }

    useEffect(() => {
        createDB();
    }, []);

    const clearDb = async() => {

    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#8100cc', dark: '#550087' }}
            headerImage={<Ionicons size={310} name="settings" style={styles.headerImage} />}>
            <ThemedText type="subtitle">Settings: </ThemedText>
            <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ThemedText>Light or Dark mode: </ThemedText>
                    <Switch
                        trackColor={{ false: '#dedede', true: '#000000' }}
                        thumbColor={isEnabled ? '#333333' : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </ThemedView>
            <Button title="Delete user?" onPress={clearDb} color={"#eb4034"}/>
            <Button title="Clear database?" onPress={clearDb} color={"#eb4034"}/>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#30004d',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        alignItems: 'center',
    },
    inputContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    reactLogo: {
        height: 160,
        width: 350,
        alignSelf: 'center', // This will center the logo horizontally // Ensure the logo takes up available space within the header
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
});
