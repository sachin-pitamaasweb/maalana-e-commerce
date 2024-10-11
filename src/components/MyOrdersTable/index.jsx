import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination
} from '@mui/material';
import './style.scss'; // Correct the import path if needed

import { useAuth } from '../../context/AuthContext';

const MyOrdersTable = () => {
    const { userId } = useAuth();
    const [orders, setOrders] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    // Fetch orders from the API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://maalana.ritaz.in/api/get-orders');
                if (response.data.success) {
                    // Filter orders by userId
                    const filteredOrders = response.data.data.filter(order => order.user === userId);
                    // Extract product details
                    const productDetails = filteredOrders.flatMap(order =>
                        order.cartItems.map(item => ({
                            productName: item.name,
                            price: item.price,
                            deliveryStatus: order.deliveryStatus,
                            orderDate: new Date(order.createdAt).toLocaleDateString(), // Format order date
                        }))
                    );

                    setOrders(filteredOrders);
                    setProductDetails(productDetails);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    // Calculate the orders to display based on the current page
    const paginatedOrders = productDetails.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <TableContainer component={Paper} className="table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    {orders.length > 0 ? (
                        <TableBody>
                            {paginatedOrders.map((order, index) => (
                                <TableRow key={index} sx={{cursor: 'pointer'}}>
                                    <TableCell>{order.productName}</TableCell>
                                    <TableCell>{order.orderDate}</TableCell>
                                    <TableCell>{order.deliveryStatus}</TableCell>
                                    <TableCell>{order.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={4}>No orders found.</TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(orders.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                className="table-pagination"
                color="primary"
            />
        </>
    );
};

export default MyOrdersTable;

