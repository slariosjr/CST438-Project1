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
  },
  bundleHi: {
    width: 64,
    height: 64,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    padding: 5,
    fontSize: 16,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  gameIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  gameTitle: {
    fontSize: 18,
  },
  gameList: {
    padding: 10,
  },
  titleCenterContainer: {
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
  madeByText: {
    alignSelf: 'center',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
  },
  reactlogoCenter: {
    height: 160,
    width: 350,
    alignSelf: 'center', // This will center the logo horizontally // Ensure the logo takes up available space within the header
    alignItems: 'center',
  }
});
