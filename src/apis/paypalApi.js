// URL base da API sandbox do PayPal
const baseUrl = 'https://api-m.sandbox.paypal.com';
// Importa o módulo 'base-64' para codificar strings em base64
const base64 = require('base-64');

// Chave do cliente (client ID) fornecida pelo PayPal para autenticação
const clientId = 'ARr_ATnnWvAaTnPSIwXufcHeI6SVfw3fFWMGuSoAHbExnDXe3cspQOc7pRVXk6lKnrilApW8cdEr4pxo';

// Chave secreta (secret key) fornecida pelo PayPal para autenticação
const secretKey = 'EGKvhd8D___N71b2xvJ2V_KPdC_UNaAzbunwvAKkWr6n4A2Be5vNaHQpjQd0TVHETAp0QuCevZeEjTil';

// Função para gerar um token de autenticação
const generateToken = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  // Codifica as chaves do cliente e secreta em base64 e adiciona à autorização
  headers.append('Authorization', 'Basic ' + base64.encode(`${clientId}:${secretKey}`));

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: 'grant_type=client_credentials',
  };

  return new Promise((resolve, reject) => {
    // Faz uma requisição para obter o token de autenticação
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

// Função para criar um pedido de pagamento
const createOrder = (orderDetail, token = '') => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,

    },
    body: JSON.stringify(orderDetail),
  };

  // Faz uma requisição para criar um pedido de pagamento
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

// Função para capturar um pagamento
const capturePayment = (id, token = '') => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,

    },
  };

  return new Promise((resolve, reject) => {
    // Faz uma requisição para capturar um pagamento com base no ID do pedido
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

// Exporta as funções como um objeto para uso em outros arquivos
export default {
  generateToken,
  createOrder,
  capturePayment,
};
