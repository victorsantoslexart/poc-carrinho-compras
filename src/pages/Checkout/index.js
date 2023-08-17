/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
// import liraries
import { useContext, useEffect, useState } from 'react';
import {
  Modal, SafeAreaView, Text, TouchableOpacity, View,
} from 'react-native';

// import { CardField } from '@stripe/stripe-react-native';
import queryString from 'query-string';
import WebView from 'react-native-webview';
import paypalApi from '../../apis/paypalApi';
import ButtonComp from '../../components/ButtonComp';
import ProductContext from '../../context/ProductContext';
import styles from './style';

// create a component
export default function Checkout({ navigation }) {
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const { shopCart, setShopCart } = useContext(ProductContext);
  const { totalShopCart, setTotalShopCart } = useContext(ProductContext);

  useEffect(() => {
    const items = shopCart.map((item) => ({
      name: item.name,
      description: item.name,
      quantity: String(item.quantity),
      unit_amount: {
        currency_code: item.currency,
        value: item.price,
      },
    }));

    // const value = shopCart.reduce((a, b) => a + (b.price * b.quantity), 0);
    // console.log(value);
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

  const onPressPaypal = async () => {
    setLoading(true);
    try {
      const token = await paypalApi.generateToken();
      const res = await paypalApi.createOrder(orderDetail, token);
      setAccessToken(token);
      console.log('res++++++', res);
      setLoading(false);
      if (res.links) {
        const findUrl = res.links.find((data) => data.rel === 'approve');
        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const onUrlChange = (webviewState) => {
    console.log('webviewStatewebviewState', webviewState);
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log('my urls value', urlValues);
      const { token } = urlValues.query;
      if (token) {
        paymentSucess(token);
      }
    }
  };

  const paymentSucess = async (id) => {
    try {
      const res = paypalApi.capturePayment(id, accessToken);
      console.log('capturePayment res++++', res);
      alert('Payment sucessfull...!!!');
      clearPaypalState();
      setShopCart([]);
      setTotalShopCart(0);
      navigation.navigate('Products');
    } catch (error) {
      console.log('error raised in payment capture', error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <ButtonComp
            onPress={onPressPaypal}
            disabled={false}
            btnStyle={{ backgroundColor: '#0f4fa3', marginVertical: 16 }}
            text="PayPal"
            isLoading={isLoading}
          />
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
