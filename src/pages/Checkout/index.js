/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
// import liraries
import { useState } from 'react';
import {
  Modal, SafeAreaView, Text, TouchableOpacity, View,
} from 'react-native';

// import { CardField } from '@stripe/stripe-react-native';
import queryString from 'query-string';
import WebView from 'react-native-webview';
import paypalApi from '../../apis/paypalApi';
import ButtonComp from '../../components/ButtonComp';
import styles from './style';

// create a component
export default function Checkout({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const orderDetail = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        items: [
          {
            name: 'T-Shirt',
            description: 'Green XL',
            quantity: '1',
            unit_amount: {
              currency_code: 'BRL',
              value: '200.00',
            },
          },
        ],
        amount: {
          currency_code: 'BRL',
          value: '200.00',
          breakdown: {
            item_total: {
              currency_code: 'BRL',
              value: '200.00',
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
