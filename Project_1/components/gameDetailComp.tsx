
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, Image, Switch } from 'react-native';

const GameDetailsComp = (props: { gameData: any[] }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <>
            {/* Game Details */}
            <ThemedView>
                {props.gameData[1] ? (
                    <Image
                        source={{ uri: `https:${props.gameData[1]}` }}
                        style={styles.gameIcon}
                        resizeMode="cover"
                    />
                ) : (
                    <Ionicons name="image" size={50} color="#808080" />
                )}
                <ThemedView style={styles.hr}/>
                <ThemedText type='title' style={styles.gameTitle}>{props.gameData[2]}</ThemedText>
                <ThemedText type='defaultSemiBold' style={styles.gameTitle}>Game ID: {props.gameData[0]}</ThemedText>
                <ThemedView style={styles.hr}/>
                <ThemedText type='subtitle'>Description:</ThemedText>
                <ThemedText style={styles.gameInfo}>{props.gameData[4]}</ThemedText>
                <ThemedView style={styles.hr}/>
                <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ThemedText type='subtitle'>Show Storyline: </ThemedText>
                    <Switch
                        trackColor={{ false: '#767577', true: '#00ff0d' }}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </ThemedView>
                {isEnabled ? (
                    <>
                    <ThemedText style={styles.gameInfo}>{props.gameData[3]}</ThemedText>
                    </>) : (<></>)}
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    gameIcon: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        borderRadius: 8,
        paddingBottom: 4,
    },
    gameInfo: {
        textAlign: 'left',
    },
    gameTitle: {
        padding: 5,
        textAlign: 'center',
    },
    gameItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    hr: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 10,
    },
});

export default GameDetailsComp;