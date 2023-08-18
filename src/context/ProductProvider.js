/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import ProductContext from './ProductContext';

export default function ProductProvider({ children }) {
  // 3 estados que vão ser usados em varias partes da aplicação
  // products guarda a lista de produtos que vem do firebase
  // shopCart guarda a lista de compras
  // totalShopCart guarda o valor total das compras
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
