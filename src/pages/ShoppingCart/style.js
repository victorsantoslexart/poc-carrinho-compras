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
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#F92E6A',
    borderWidth: 2,
  },
  addToCart: {
    alignItems: 'center',
  },
  iconButton: {
    color: '#F92E6A',
    fontSize: 20,
    margin: 6,
  },
  gobackButton: {
    color: '#F92E6A',
    fontSize: 20,
    margin: 6,
    // fontWeight: '500',
  },
  text: {
    color: '#FFFFFF',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  shopCart: {
    flex: 1,
    backgroundColor: 'white',
    gap: 20,
  },
  plusOrMinus: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: 100,
    marginTop: 3,
  },
});

export default styles;
