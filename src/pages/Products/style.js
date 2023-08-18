import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  products: {
    flex: 1,
    backgroundColor: '#DAC2FF',
  },
  flatlistProducts: {
    marginHorizontal: 12,
    gap: 15,
  },
  viewProducts: {
    // width: 110,
    marginTop: 15,
    borderRadius: 10,
    borderColor: '#F7C4FE',
    borderWidth: 2,
    height: 110,
  },
  addToCart: {
    alignItems: 'center',
  },
  iconButton: {
    color: '#F92E6A',
    fontSize: 20,
    margin: 6,
  },
  text: {
    color: '#FFFFFF',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default styles;
