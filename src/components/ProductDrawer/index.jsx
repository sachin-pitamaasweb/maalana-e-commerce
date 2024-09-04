import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import './style.css';

import { useAuth } from '../../context/AuthContext';

const ProductDrawer = ({ drawerOpen, setDrawerOpen, product, cartId }) => {
  console.log('product', product, 'cartId', cartId);
  const navigate = useNavigate();
  const { userId, updateCartItemCount } = useAuth();
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`https://maalana-backend.onrender.com/api/get-all-cart-by-user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const cartItem = data.cart.flatMap(cart => cart.items).find(item => item.productId._id === product._id);

        if (cartItem) {
          setCount(cartItem.quantity);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    if (userId) {
      fetchCartData();
    }
  }, [userId, product._id]);

  // Update cart on the server
  const updateCart = async (newQuantity) => {
    setLoading(true);
    try {
      const response = await fetch('https://maalana-backend.onrender.com/api/update-cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: product._id,
          quantity: newQuantity,
          cartId: cartId,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
       if(data.success){
        updateCartItemCount(data.totalQuantity);
       }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setLoading(false); // Set loading to false when the update is complete
    }
  };
  

  const handleRemove = async (cartId, productId) => {
    setRemoveLoading(true);
    try {
      const response = await fetch('https://maalana-backend.onrender.com/api/delete-cart-product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          cartId: cartId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Product removed from cart:', data);

      if (data.success) {
        setCount(0); // Optionally, set count to 0 or remove the product from the UI
        updateCartItemCount(data.totalQuantity); // Update the cart item count
        setDrawerOpen(false);
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
    } finally {
      setRemoveLoading(false);
    }
  };


  // Handle increment and decrement
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateCart(newCount);
  };

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateCart(newCount);
    }
  };

  const handleGotoCart = () => {
    setDrawerOpen(false);
    navigate('/cart');
  }
console.log(product);
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <div className="add-drawer-container">
        <div className="add-drawer">
          <ShoppingBagIcon className="add-icon-drawer" />
          <CloseIcon className="close-icon" onClick={() => setDrawerOpen(false)} />
        </div>
        <div className="drawer-product-info">
          <img src={product.images.mainImage} alt={product.name} />
          <div className="drawer-product-details">
            <p>{product.name}</p>
            <p>₹<span>{product.price}</span></p>
          { loading ? <CircularProgress size={20} />:  <div className="item-quantity" style={{ marginBottom: '20px' }}>
              <button aria-label="Decrease quantity" onClick={handleDecrement}>-</button>
              <input type="number" value={count} min="1" aria-label="Quantity" />
              <button aria-label="Increase quantity" onClick={handleIncrement}>+</button>
            </div>}
           { removeLoading ? <CircularProgress size={20} /> : <p className="remove-btn" onClick={() => handleRemove(cartId, product._id)}>Remove</p>}
          </div>
        </div>
        <Button variant="contained" className="go-to-cart-btn" onClick={handleGotoCart}>
          GO TO CART
        </Button>
      </div>
    </Drawer>
  );
};

export default ProductDrawer;
