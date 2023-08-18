import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  products: {
    flex: 1,
    backgroundColor: '#14161A',
  },
  flatlistProducts: {
    marginHorizontal: 12,
    gap: 15,
  },
  viewProducts: {
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 10,
    borderColor: '#F92E6A',
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
    color: 'white',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default styles;
