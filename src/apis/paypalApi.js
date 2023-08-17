const baseUrl = 'https://api-m.sandbox.paypal.com';
const base64 = require('base-64');

const clientId = 'ARr_ATnnWvAaTnPSIwXufcHeI6SVfw3fFWMGuSoAHbExnDXe3cspQOc7pRVXk6lKnrilApW8cdEr4pxo';
const secretKey = 'EGKvhd8D___N71b2xvJ2V_KPdC_UNaAzbunwvAKkWr6n4A2Be5vNaHQpjQd0TVHETAp0QuCevZeEjTil';

const generateToken = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Basic ' + base64.encode(`${clientId}:${secretKey}`));

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: 'grant_type=client_credentials',
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + '/v1/oauth2/token', requestOptions).then((response) => response.text()).then((result) => {
      console.log('result print', result);
      const { access_token: accessToken } = JSON.parse(result);
      resolve(accessToken);
    }).catch((error) => {
      console.log('error raised', error);
      reject(error);
    });
  });
};

const createOrder = (orderDetail, token = '') => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,

    },
    body: JSON.stringify(orderDetail),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + '/v2/checkout/orders', requestOptions).then((response) => response.text()).then((result) => {
      console.log('result print', result);
      const res = JSON.parse(result);
      resolve(res);
    }).catch((error) => {
      console.log('error raised', error);
      reject(error);
    });
  });
};

const capturePayment = (id, token = '') => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,

    },
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions).then((response) => response.text()).then((result) => {
      console.log('result print', result);
      const res = JSON.parse(result);
      resolve(res);
    }).catch((error) => {
      console.log('error raised', error);
      reject(error);
    });
  });
};

export default {
  generateToken,
  createOrder,
  capturePayment,
};
