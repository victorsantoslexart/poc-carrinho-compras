import { FontAwesome } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore/lite';
import React, { useContext, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import database from "../../config/firebaseconfig";
import ProductContext from '../../context/ProductContext';
import styles from './style';

export default function Products({navigation}) {
  const {products, setProducts} = useContext(ProductContext);
  const {shopCart, setShopCart} = useContext(ProductContext);

  const addToCart = (item) => {
    const newShopCart = [...shopCart];
    
    const uidIndex = newShopCart.findIndex((shopItem) => shopItem.uid === item.uid)

    if (uidIndex !== -1) {
      newShopCart.splice(uidIndex, 1);
    } else {
      newShopCart.push(item);
    }

    setShopCart(newShopCart)
  }

  useEffect(() => {
    console.log(shopCart);
  }, [shopCart])

  useEffect(() => {
    async function fetchData() {
      const prodCollec = collection(database, 'products');
      const prodSnapshot = await getDocs(prodCollec);
  
      const p = []
      prodSnapshot.forEach(doc => {
        p.push({
          uid: doc.id,
          ...doc.data()
        })
      });
      setProducts(p);
    }
    fetchData();
  }, []);
  
  return(
    <View style={styles.Products}>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({item}) => {
          return(
          <View style={styles.viewProducts}>
            <TouchableOpacity
              style={styles.addToCart}
              onPress={() => addToCart(item)}
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
        onPress={() => navigation.navigate("Shopping Cart")}
      >
        <Text style={styles.iconButton}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  )
};