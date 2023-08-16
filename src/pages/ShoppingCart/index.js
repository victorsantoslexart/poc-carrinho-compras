import { FontAwesome } from "@expo/vector-icons";
import React, { useContext } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ProductContext from "../../context/ProductContext";
import styles from "./style";

export default function ShoppingCart() {
  const {shopCart, setShopCart} = useContext(ProductContext);

  const removeShopCart = (item) => {
    const newShopCart = shopCart.filter((newItem) => newItem.uid !== item.uid);

    setShopCart(newShopCart);
  }

  if (shopCart.length > 0) {
    return(
      <View style={styles.shopCart}>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={shopCart}
          renderItem={({item}) => {
            return(
            <View style={styles.viewProducts}>
              <TouchableOpacity
                style={styles.addToCart}
                onPress={() => removeShopCart(item)}
              >
                <FontAwesome
                  name='star'
                  size={23}
                  color="#F92E6A"
                />
                <Text
                  style={styles.nameText}
                >
                  {item.name}
                </Text>
                <Text
                  style={styles.categoryText}
                >
                  {item.category}
                </Text>
                <View>
                  <Text
                    style={styles.priceText}
                  >
                    {item.price}
                  </Text>
                  <Text
                    style={styles.currencyText}
                  >
                    {item.currency}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            )
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.iconButton}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={styles.shopCart}>
        <Text>
          The shopping cart is empty!
        </Text>
      </View>
    )
  }
};