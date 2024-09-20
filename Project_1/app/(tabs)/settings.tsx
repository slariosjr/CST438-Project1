import React, { useEffect, useState } from 'react';
import {Button, Switch, Alert, Image, Linking, TouchableOpacity} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Appearance } from 'react-native';
import { createDatabase, printAllTables, resetDB } from '@/lib/database';
import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '@/lib/Style';

let db: SQLiteDatabase;

export default function HomeScreen() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if (!isEnabled) Appearance.setColorScheme('dark');
        else Appearance.setColorScheme('light');
    }

    const createDB = async () => {
        await createDatabase();
        db = await openDatabaseAsync('app.db');
        await printAllTables(db);
    }

    useEffect(() => {
        createDB();
    }, []);

    const clearDbAlert = async () => {
        Alert.alert('Clear the local database?', 'The data is not recoverable!', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => {
                resetDB(db);
                Alert.alert("Database cleared returning to login screen");
                router.push("/(tabs)/");
            } },
        ]);
    }

    const deleteUser = async() => {
        Alert.alert('Do you want to delete the current user?', 'The data is not recoverable!', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => {
                Alert.alert("Current User Deleted, returning to login screen");
                router.push("/(tabs)/");
            } },
        ]);
    }

    const gotoGithub = async() => {
        Linking.openURL('https://github.com/slariosjr/CST438-Project1')
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#8100cc', dark: '#550087' }}
            headerImage={<Ionicons size={310} name="settings"  style={{color: '#30004d',
                        bottom: -90,
                        left: -35,
                        position: 'absolute',}} />}>
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
            <Button title="Delete user?" onPress={deleteUser} color={"#eb4034"} />
            <Button title="Clear database?" onPress={clearDbAlert} color={"#eb4034"} />
            <ThemedView style={styles.hr}/>
            <ThemedText type="subtitle">About: </ThemedText>
            <ThemedView>
                <Image
                    source={require('@/assets/images/BundleLogox512x256.png')}
                    style={styles.reactlogoCenter}
                />
                <ThemedText style={styles.madeByText} type='title'> Made by: </ThemedText> 
                <ThemedText style={styles.madeByText} type="defaultSemiBold"> Alexander Betancourt  </ThemedText>
                <ThemedText style={styles.madeByText} type="defaultSemiBold"> Sergio Larios </ThemedText>
                <ThemedText style={styles.madeByText} type="defaultSemiBold"> Silvia Pineda Jimenez </ThemedText>
                <ThemedText style={styles.madeByText} type="defaultSemiBold"> Kyla Usi </ThemedText>
                <ThemedView style={styles.hr}/>
                <ThemedText style={styles.madeByText}> SEE ON GITHUB</ThemedText>
                <TouchableOpacity onPress={gotoGithub}>
                    <AntDesign style={styles.madeByText} name="github" size={120} color="black" />
                </TouchableOpacity>
            </ThemedView>
        </ParallaxScrollView>
        
    );
}