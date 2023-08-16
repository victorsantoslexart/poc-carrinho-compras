import { collection, getDocs } from 'firebase/firestore/lite';
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import database from "../../config/firebaseconfig";
import styles from './style';

export default function Products({navigation}) {
  const [products, setProducts] = useState([]);

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
        renderItem={(item) => {
          <View style={styles.viewProducts}>
            <TouchableOpacity
              style={styles.addToCart}
              onPress={addToCart}
            >
              <Text style={styles.iconButton}>
                +
              </Text>
            </TouchableOpacity>
          </View>
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