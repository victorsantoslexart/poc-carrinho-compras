import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import database from "../../config/firebaseconfig";
import styles from './style';

export default function Products({navigation}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    database.collection("products").onSnapshot((query) => {
      const p = []
      query.forEach(doc => {
        p.push({
          uid: doc.id,
          ...doc.data()
        })
      });
      setProducts(p);
    })
  }, [])
  return(
    <View style={styles.Products}>
      <FlatList />
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