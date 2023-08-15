import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Checkout from './src/pages/Checkout';
import Products from './src/pages/Products';
import ShoppingCart from './src/pages/ShoppingCart';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Products'>
        <Stack.Screen
          name="Products"
          component={Products}
          options={{
            headerTintColor: "red"
          }}
        />
        <Stack.Screen
          name="Shopping Cart"
          component={ShoppingCart}
          options={{
            headerTintColor: "red"
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            headerTintColor: "red"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
