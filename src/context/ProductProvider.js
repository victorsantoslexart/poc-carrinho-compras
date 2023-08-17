/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import ProductContext from './ProductContext';

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [shopCart, setShopCart] = useState([]);

  const value = useMemo(() => ({
    shopCart,
    setShopCart,
    products,
    setProducts,

  }), [products, setProducts, setShopCart, shopCart]);

  return (
    <ProductContext.Provider value={value}>
      { children }
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
