// Importa o ícone FontAwesome da biblioteca Expo
import { FontAwesome } from '@expo/vector-icons';
// Importa funções para interagir com a coleção Firestore e outros componentes do React Native
import { collection, getDocs } from 'firebase/firestore/lite';
import React, { useContext, useEffect } from 'react';
import {
  FlatList, Text, TouchableOpacity, View,
} from 'react-native';
// Importa a configuração do Firebase
import database from '../../config/firebaseconfig';
// Importa o contexto do produto
import ProductContext from '../../context/ProductContext';
// Importa os estilos do componente
import styles from './style';

// Componente Products: Página de exibição de produtos
export default function Products({ navigation }) {
  // Obtém os estados e funções do contexto do produto
  const { products, setProducts } = useContext(ProductContext);
  const { shopCart, setShopCart } = useContext(ProductContext);
  const { setTotalShopCart } = useContext(ProductContext);

  // Função para adicionar um item ao carrinho de compras
  const addToCart = (item) => {
    const newShopCart = [...shopCart];

    // Aumenta quantity de product
    const newProd = products.map((pItem) => (pItem.uid === item.uid
      ? ({ ...pItem, quantity: pItem.quantity + 1 }) : pItem));

    // Verifica se o item já está no carrinho
    const uidIndex = newShopCart.findIndex((shopItem) => shopItem.uid === item.uid);
    const filteredCart = shopCart.find((nItem) => nItem.uid === item.uid);

    // Atualiza o carrinho com a quantidade do item
    if (uidIndex !== -1) {
      newShopCart.splice(uidIndex, 1, { ...item, quantity: filteredCart.quantity + 1 });
    } else {
      newShopCart.push({ ...item, quantity: 1 });
    }

    setProducts(newProd);
    setShopCart(newShopCart);
  };

  // Atualiza o total do carrinho sempre que o carrinho muda
  useEffect(() => {
    const newTotal = shopCart.reduce((a, b) => a + (b.price * b.quantity), 0);
    setTotalShopCart(newTotal);
  }, [shopCart]);

  // Busca os produtos no Firestore e atualiza o estado
  useEffect(() => {
    async function fetchData() {
      const prodCollec = collection(database, 'products'); // Referência à coleção 'products'
      const prodSnapshot = await getDocs(prodCollec); // Obtém os documentos da coleção

      const p = [];
      prodSnapshot.forEach((doc) => {
        p.push({
          uid: doc.id,
          ...doc.data(),
          quantity: 0,
        });
      });
      setProducts(p); // Atualiza o estado dos produtos
    }
    if (products.length <= 0) fetchData();
  }, []);

  // Renderização do componente
  return (
    <View style={styles.products}>
      {/* Lista de produtos */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        contentContainerStyle={styles.flatlistProducts}
        renderItem={({ item }) => (
          <View style={styles.viewProducts}>
            {/* Botão para adicionar ao carrinho */}
            <TouchableOpacity
              style={styles.addToCart}
              onPress={() => addToCart(item)}
            >
              <FontAwesome
                name="star"
                size={23}
                color="#F70632"
              />
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
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Botão para navegar ao carrinho de compras */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Shopping Cart')}
      >
        <Text style={styles.iconButton}>
          <FontAwesome
            name="shopping-cart"
            size={23}
            color="#F92E6A"
          />
          {' Shopping Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
