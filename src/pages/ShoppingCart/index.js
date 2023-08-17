import { FontAwesome } from '@expo/vector-icons';
import React, { useContext } from 'react';
import {
  FlatList, Text, TouchableOpacity, View,
} from 'react-native';
import ProductContext from '../../context/ProductContext';
import styles from './style';

export default function ShoppingCart({ navigation }) {
  const { shopCart, setShopCart } = useContext(ProductContext);

  const addToCart = (item) => {
    const newShopCart = [...shopCart];

    const uidIndex = newShopCart.findIndex((shopItem) => shopItem.uid === item.uid);
    const filteredCart = shopCart.find((nItem) => nItem.uid === item.uid);

    if (uidIndex !== -1) {
      newShopCart.splice(uidIndex, 1, { ...item, quantity: filteredCart.quantity + 1 });
    } else {
      newShopCart.push({ ...item, quantity: 1 });
    }

    setShopCart(newShopCart);
  };

  const removeShopCart = (item) => {
    const newShopCart = shopCart.filter((newItem) => newItem.uid !== item.uid);

    setShopCart(newShopCart);
  };

  if (shopCart.length > 0) {
    return (
      <View style={styles.shopCart}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.iconButton}>
            PRODUCTS
          </Text>
        </TouchableOpacity>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={shopCart}
          renderItem={({ item }) => (
            <View style={styles.viewProducts}>
              <TouchableOpacity
                style={styles.addToCart}
                onPress={() => addToCart(item)}
              >
                <FontAwesome
                  name="star"
                  size={23}
                  color="#F92E6A"
                />
                <Text
                  style={styles.nameText}
                >
                  {'Name: '}
                  {item.name}
                </Text>
                <Text
                  style={styles.categoryText}
                >
                  {'Category: '}
                  {item.category}
                </Text>
                <View>
                  <Text
                    style={styles.priceText}
                  >
                    {'Price: '}
                    {item.price}
                  </Text>
                  <Text
                    style={styles.currencyText}
                  >
                    {'Currency: '}
                    {item.currency}
                  </Text>
                  <Text
                    style={styles.quantityText}
                  >
                    {'Quantity: '}
                    {item.quantity}
                  </Text>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout')}
        >
          <FontAwesome
            name="paypal"
            size={23}
            color="#F92E6A"
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.shopCart}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.iconButton}>
          PRODUCTS
        </Text>
      </TouchableOpacity>
      <Text>
        The shopping cart is empty!
      </Text>
    </View>
  );
}
