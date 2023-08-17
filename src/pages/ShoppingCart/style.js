import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  products: {
    flex: 1,
    backgroundColor: '#DAC2FF',
  },
  flatlistProducts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 12,
    gap: 15,
  },
  viewProducts: {
    borderRadius: 2,
    borderColor: '#F7C4FE',
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
