import { StyleSheet } from 'react-native';

// Screw CSS, me and zuck finally agree on something. 
export const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  }, 
  titleContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
    gap: 8,
  },
  buttonContainer: {
    padding: 10,
  },
  buttonLight: {
    color: '#8370ff',
  },
  buttonDark: {
    color: '#6047ff',
  }
});
