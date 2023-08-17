import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  products: {
    flex: 1,
    backgroundColor: '#DAC2FF',
  },
  flatlistProducts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 12,
    gap: 15,
  },
  viewProducts: {
    width: 110,
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
