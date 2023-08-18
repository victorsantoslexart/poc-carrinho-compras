// Importa o ícone FontAwesome da biblioteca Expo
import { FontAwesome } from '@expo/vector-icons';
// Importa o componente React e o contexto do produto
import React, { useContext } from 'react';
// Importa componentes do React Native
import {
  FlatList, Text, TouchableOpacity, View,
} from 'react-native';
// Importa o contexto do produto
import ProductContext from '../../context/ProductContext';
// Importa os estilos do componente
import styles from './style';

// Componente ShoppingCart: Página do carrinho de compras
export default function ShoppingCart({ navigation }) {
  // Obtém os estados e funções do contexto do produto
  const { shopCart, setShopCart } = useContext(ProductContext);
  const { totalShopCart } = useContext(ProductContext);

  // Função para adicionar uma unidade a um item no carrinho
  const addOneToCart = (item) => {
    const newShopCart = [...shopCart];

    const uidIndex = newShopCart.findIndex((shopItem) => shopItem.uid === item.uid);

    newShopCart.splice(uidIndex, 1, { ...item, quantity: item.quantity + 1 });

    setShopCart(newShopCart);
  };

  // Função para remover uma unidade de um item no carrinho
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

  // Função para remover um item do carrinho
  const removeShopCart = (item) => {
    const newShopCart = shopCart.filter((newItem) => newItem.uid !== item.uid);

    setShopCart(newShopCart);
  };

  // Renderização do componente
  if (shopCart.length > 0) {
    return (
      <View style={styles.products}>
        {/* Botão para voltar à página de produtos */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Products')}
        >
          <Text
            style={styles.gobackButton}
          >
            <FontAwesome
              name="home"
              size={23}
              color="#F92E6A"
            />
            {' Home'}
          </Text>
        </TouchableOpacity>
        {/* Lista de itens no carrinho */}
        <FlatList
          showsVerticalScrollIndicator
          data={shopCart}
          contentContainerStyle={styles.flatlistProducts}
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
                {/* Botões para aumentar e diminuir a quantidade */}
                <View style={styles.plusOrMinus}>
                  <FontAwesome
                    name="plus"
                    size={27}
                    color="#F92E6A"
                    onPress={() => addOneToCart(item)}
                  />
                  <Text style={{ color: '#F92E6A' }}>{' / '}</Text>
                  <FontAwesome
                    name="minus"
                    size={27}
                    color="#F92E6A"
                    onPress={() => minusOneToCart(item)}
                  />
                </View>
              </TouchableOpacity>
              {/* Botão para remover o item do carrinho */}
              <FontAwesome
                name="remove"
                size={23}
                color="#F92E6A"
                onPress={() => removeShopCart(item)}
              />
            </View>
          )}
        />
        {/* Exibe o total da compra */}
        <Text style={{ color: '#F92E6A', margin: 6 }}>
          Total purchase amount: R$
          {totalShopCart}
        </Text>
        {/* Botão para pagar com o PayPal */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.iconButton}>
            <FontAwesome
              name="paypal"
              size={23}
              color="#F92E6A"
            />
            {' Pay with PayPal'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  // Caso o carrinho esteja vazio
  return (
    <View style={styles.products}>
      {/* Botão para voltar à página de produtos */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Products')}
      >
        <Text
          style={styles.gobackButton}
        >
          <FontAwesome
            name="home"
            size={23}
            color="#F92E6A"
          />
          {' Home'}
        </Text>
      </TouchableOpacity>
      {/* Mensagem de carrinho vazio */}
      <Text style={{ ...styles.iconButton, fontSize: 18 }}>
        The shopping cart is empty!
      </Text>
    </View>
  );
}
