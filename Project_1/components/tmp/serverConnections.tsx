import { StyleProp, FlatList, Button } from 'react-native';
import { ThemedView } from '../ThemedView';

// Typescript is really nice, until it ain't.. 
// Good songs: https://youtu.be/wnMG27_-g6s?si=6FRZZMkX4jyibxAH
export default function serverConnections(props: {
    style: StyleProp<any>,
    connections: any[],
    connectAlert: (name: string) => void
}): React.JSX.Element {
    return (
        <FlatList
            scrollEnabled={false}
            data={props.connections}
            renderItem={({ item }) => (
                <ThemedView style={props.style.ButtonContainer}>
                    <Button title={item.deviceName} color={props.style.Button.color} onPress={() => props.connectAlert(item.deviceName)} />
                </ThemedView>
            )}
            keyExtractor={(item) => item.address}
        />
    );
};