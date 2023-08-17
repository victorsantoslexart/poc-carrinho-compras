/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import ProductContext from './ProductContext';

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [shopCart, setShopCart] = useState([]);
  const [totalShopCart, setTotalShopCart] = useState(0);

  const value = useMemo(() => ({
    shopCart,
    setShopCart,
    products,
    setProducts,
    totalShopCart,
    setTotalShopCart,

  }), [products, setProducts, setShopCart, shopCart, totalShopCart, setTotalShopCart]);

  return (
    <ProductContext.Provider value={value}>
      { children }
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
