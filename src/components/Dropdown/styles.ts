import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    zIndex: 2,
  },
  flatListContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  buttonItemStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    zIndex: 3,
  },
});
