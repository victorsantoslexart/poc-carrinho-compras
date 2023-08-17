import { FontAwesome } from '@expo/vector-icons';
import React, { useContext } from 'react';
import {
  FlatList, Text, TouchableOpacity, View,
} from 'react-native';
import ProductContext from '../../context/ProductContext';
import styles from './style';

export default function ShoppingCart({ navigation }) {
  const { shopCart, setShopCart } = useContext(ProductContext);
  const { totalShopCart } = useContext(ProductContext);

  const addOneToCart = (item) => {
    const newShopCart = [...shopCart];

    const uidIndex = newShopCart.findIndex((shopItem) => shopItem.uid === item.uid);

    newShopCart.splice(uidIndex, 1, { ...item, quantity: item.quantity + 1 });

    setShopCart(newShopCart);
  };

  const minusOneToCart = (item) => {
    const newShopCart = [...shopCart];

    const uidIndex = newShopCart.findIndex((shopItem) => shopItem.uid === item.uid);

    if (item.quantity > 1) {
      newShopCart.splice(uidIndex, 1, { ...item, quantity: item.quantity - 1 });
    } else {
      newShopCart.splice(uidIndex, 1);
    }

    setShopCart(newShopCart);
  };

  const removeShopCart = (item) => {
    const newShopCart = shopCart.filter((newItem) => newItem.uid !== item.uid);

    setShopCart(newShopCart);
  };

  if (shopCart.length > 0) {
    return (
      <View style={styles.products}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.iconButton}>
            Home
          </Text>
        </TouchableOpacity>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={shopCart}
          renderItem={({ item }) => (
            <View style={styles.viewProducts}>
              <TouchableOpacity
                style={styles.addToCart}
              >
                <Text
                  style={{ ...styles.text, ...styles.nameText }}
                >
                  {'Name: '}
                  {item.name}
                </Text>
                <Text
                  style={styles.text}
                >
                  {'Category: '}
                  {item.category}
                </Text>
                <View>
                  <Text
                    style={styles.text}
                  >
                    {'Price: '}
                    {item.price}
                    {' '}
                    {item.currency}
                  </Text>
                  <Text
                    style={styles.text}
                  >
                    {'Quantity: '}
                    {item.quantity}
                  </Text>
                </View>
                <View style={styles.plusOrMinus}>
                  <FontAwesome
                    name="plus"
                    size={23}
                    color="#F92E6A"
                    onPress={() => addOneToCart(item)}
                  />
                  <Text style={{ color: '#F92E6A' }}>{' / '}</Text>
                  <FontAwesome
                    name="minus"
                    size={23}
                    color="#F92E6A"
                    onPress={() => minusOneToCart(item)}
                  />
                </View>
              </TouchableOpacity>
              <FontAwesome
                name="remove"
                size={23}
                color="#F92E6A"
                onPress={() => removeShopCart(item)}
              />
            </View>
          )}
        />
        <Text style={{ color: '#F92E6A' }}>
          Total purchase amount: R$
          {totalShopCart}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.iconButton}>
            <FontAwesome
              name="paypal"
              size={23}
              color="#F92E6A"
            />
            {' Pay with Paypal'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.products}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.iconButton}>
          Home
        </Text>
      </TouchableOpacity>
      <Text>
        The shopping cart is empty!
      </Text>
    </View>
  );
}
