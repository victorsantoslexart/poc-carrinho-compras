import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProductProvider from './src/context/ProductProvider';
import Checkout from './src/pages/Checkout';
import Products from './src/pages/Products';
import ShoppingCart from './src/pages/ShoppingCart';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Products">
          <Stack.Screen
            name="Products"
            component={Products}
            options={{
              headerTintColor: '#F92E6A',
            }}
          />
          <Stack.Screen
            name="Shopping Cart"
            component={ShoppingCart}
            options={{
              headerTintColor: '#F92E6A',
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              headerTintColor: '#F92E6A',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}
