/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-alert */

// Importa os módulos e componentes necessários do React Native e de outras bibliotecas
import { FontAwesome } from '@expo/vector-icons'; // Importa o ícone FontAwesome
import queryString from 'query-string'; // Importa a biblioteca para manipulação de URLs com query strings
import { useContext, useEffect, useState } from 'react';
import {
  Modal, SafeAreaView, Text, TouchableOpacity, View,
} from 'react-native';
import WebView from 'react-native-webview'; // Importa o componente WebView
import paypalApi from '../../apis/paypalApi'; // Importa o módulo com as funções de API para o PayPal
import ButtonComp from '../../components/ButtonComp'; // Importa o componente personalizado ButtonComp
import ProductContext from '../../context/ProductContext'; // Importa o contexto do produto
import styles from './style'; // Importa os estilos do componente

// Componente Checkout: Página de finalização de pagamento
export default function Checkout({ navigation }) {
  // Estados do componente
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const { shopCart, setShopCart } = useContext(ProductContext);
  const { totalShopCart, setTotalShopCart } = useContext(ProductContext);

  useEffect(() => {
    // Cria os detalhes do pedido com base nos itens no carrinho
    const items = shopCart.map((item) => ({
      name: item.name,
      description: item.name,
      quantity: String(item.quantity),
      unit_amount: {
        currency_code: item.currency,
        value: item.price,
      },
    }));

    // Cria o objeto de pedido
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          items,
          amount: {
            currency_code: 'BRL',
            value: String(totalShopCart),
            breakdown: {
              item_total: {
                currency_code: 'BRL',
                value: String(totalShopCart),
              },
            },
          },
        },
      ],
      application_context: {
        return_url: 'https://example.com/return',
        cancel_url: 'https://example.com/cancel',
      },
    };
    setOrderDetail(order);
  }, []);

  // Função chamada ao pressionar o botão "PayPal"
  const onPressPaypal = async () => {
    setLoading(true);
    try {
      const token = await paypalApi.generateToken(); // Gera um token de autenticação
      const res = await paypalApi.createOrder(orderDetail, token); // Cria um pedido no PayPal
      setAccessToken(token);
      setLoading(false);
      if (res.links) {
        const findUrl = res.links.find((data) => data.rel === 'approve');
        setPaypalUrl(findUrl.href); // Define a URL de pagamento do PayPal
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  // Função chamada quando a URL do WebView muda
  const onUrlChange = (webviewState) => {
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState(); // Limpa os estados relacionados ao PayPal
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      const { token } = urlValues.query;
      if (token) {
        paymentSucess(token); // Realiza ação de sucesso após o pagamento
      }
    }
  };

  // Função chamada após o pagamento ser bem-sucedido
  const paymentSucess = async (id) => {
    try {
      const res = paypalApi.capturePayment(id, accessToken); // Captura o pagamento no PayPal
      console.log('capturePayment res++++', res);
      alert('Payment successful...!!!');
      clearPaypalState();
      setShopCart([]); // Limpa o carrinho de compras
      setTotalShopCart(0); // Zera o total do carrinho
      navigation.navigate('Products'); // Navega de volta para a lista de produtos
    } catch (error) {
      console.log('error raised in payment capture', error);
    }
  };

  // Função para limpar os estados relacionados ao PayPal
  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  // Renderização do componente
  return (
    <View style={styles.container}>
      {/* Botão para navegar ao carrinho de compras */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Shopping Cart')}
      >
        <Text style={styles.iconButton}>
          <FontAwesome
            name="shopping-cart"
            size={23}
            color="#F92E6A"
            onPress={() => addOneToCart(item)}
          />
          {' Shopping Cart'}
        </Text>
      </TouchableOpacity>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          {/* Botão de pagamento PayPal */}
          <ButtonComp
            onPress={onPressPaypal}
            disabled={false}
            btnStyle={{ backgroundColor: '#0f4fa3', marginVertical: 16 }}
            text="PayPal"
            isLoading={isLoading}
          />
          {/* Modal para exibir o WebView do PayPal */}
          <Modal
            visible={!!paypalUrl}
          >
            <TouchableOpacity
              onPress={clearPaypalState}
              style={{ margin: 24 }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <WebView
                source={{ uri: paypalUrl }}
                onNavigationStateChange={onUrlChange}
              />
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
}
