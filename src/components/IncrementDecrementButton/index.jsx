import React, { useEffect, useState } from 'react';
import './style.scss';
import { useAuth } from '../../context/AuthContext';

const IncrementDecrementButton = ({ productId }) => {
    const [count, setCount] = useState(0);
    const { userId } = useAuth();

    // Fetch cart data on component mount or userId change
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/get-all-cart-by-user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const cartItem = data.cart.flatMap(cart => cart.items).find(item => item.productId._id === productId);
                console.log('Cart item:', cartItem);    
                if (cartItem) {
                    setCount(cartItem.quantity);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [userId, productId]);

    // Update cart on the server
    const updateCart = async (newQuantity) => {
        try {
            const response = await fetch('http://localhost:8000/api/update-cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productId,
                    quantity: newQuantity,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Cart updated successfully:', data);
        } catch (error) {
            console.error('Error updating cart:', error);
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

    return (
        <div className="counter">
            <button className="counter-button decrement" onClick={handleDecrement}>-</button>
            <span className="counter-value">{count}</span>
            <button className="counter-button increment" onClick={handleIncrement}>+</button>
        </div>
    );
};

export default IncrementDecrementButton;
