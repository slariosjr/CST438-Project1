import { StyleProp, Button, ColorSchemeName } from 'react-native';
import { ThemedText } from "../ThemedText"
import { ThemedView } from '../ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';




const ServerConnections = (props: { style: StyleProp<any>, startConnection: ()=> void}): React.JSX.Element => {
    const colorScheme: ColorSchemeName = useColorScheme();
    const buttonColor = colorScheme === 'dark' ? props.style.buttonDark.color : props.style.buttonLight.color;
    return <>
        {/* <FlatList
            scrollEnabled={false}
            data={props.connections}
            renderItem={({ item }) => (
                <ThemedView style={props.style.ButtonContainer}>
                    <Button title={item.deviceName} color={props.style.Button.color} onPress={() => props.connectAlert(item.deviceName)} />
                </ThemedView>
            )}
            keyExtractor={(item) => item.address}
        /> */}
    </>
}

export default ServerConnections;