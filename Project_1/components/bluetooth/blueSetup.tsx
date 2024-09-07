import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, StyleProp } from 'react-native';

export default function BluetoothSetupComp(props: { setUpBluetoothConnection: () => Promise<boolean>, style: StyleProp<any> }): React.JSX.Element {
    const handleButton = async (): Promise<boolean> => {
        return await props.setUpBluetoothConnection();
    }
    return (<>
        <ThemedView style={props.style.titleContainer}>
            <ThemedText type="title">Bluetooth Mode</ThemedText>
        </ThemedView>
        <ThemedText type="subtitle">Connect with nearby users to find games, which you share in common!</ThemedText>
        <ThemedText>Press the button to get started with bluetooth mode!</ThemedText>
        <Button title="Start looking" onPress={handleButton}/>
    </>
    );
}
