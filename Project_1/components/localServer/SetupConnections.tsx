import { StyleProp, Button, ColorSchemeName } from 'react-native';
import { ThemedText } from "../ThemedText"
import { ThemedView } from '../ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

const SetupConnections = (props: { style: StyleProp<any>, startConnection: ()=> void}): React.JSX.Element => {
    const colorScheme: ColorSchemeName = useColorScheme();
    const buttonColor = colorScheme === 'dark' ? props.style.buttonDark.color : props.style.buttonLight.color;
    return <>
        <ThemedView style={props.style.TitleContainer}>
            <ThemedText type="title">Nearby mode</ThemedText>
            <ThemedText type="defaultSemiBold">Connect with users on the same network to find games, which you share in common!</ThemedText>
            <ThemedText type="default"></ThemedText>
            <Button title="Get started" color={buttonColor} onPress={() => {
                props.startConnection();
            }} />
        </ThemedView>
    </>
}

export default SetupConnections;