import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination
} from '@mui/material';
import './style.scss'; // Correct the import path if needed

const MyOrdersTable = () => {
    const [orders] = useState([
        { productName: 'Candy', orderDate: '08-01-2024', status: 'Shipped', price: '$20' },
        { productName: 'Ladoo', orderDate: '08-05-2024', status: 'Delivered', price: '$15' },
        { productName: 'Chocolate', orderDate: '08-07-2024', status: 'Processing', price: '$25' },
        { productName: 'Fruit Katli', orderDate: '08-10-2024', status: 'Delivered', price: '$18' },
        { productName: 'Imli Ladoo', orderDate: '08-12-2024', status: 'Shipped', price: '$22' },
        { productName: 'Barfi', orderDate: '08-15-2024', status: 'Delivered', price: '$30' },
        { productName: 'Gulab Jamun', orderDate: '08-17-2024', status: 'Processing', price: '$12' },
        { productName: 'Rasgulla', orderDate: '08-19-2024', status: 'Shipped', price: '$16' },
        { productName: 'Peda', orderDate: '08-21-2024', status: 'Delivered', price: '$10' },
        { productName: 'Jalebi', orderDate: '08-23-2024', status: 'Processing', price: '$28' },
        { productName: 'Kaju Katli', orderDate: '08-25-2024', status: 'Delivered', price: '$35' },
        { productName: 'Motichoor Ladoo', orderDate: '08-27-2024', status: 'Shipped', price: '$32' },
        { productName: 'Besan Ladoo', orderDate: '08-28-2024', status: 'Delivered', price: '$19' },
        { productName: 'Soan Papdi', orderDate: '08-29-2024', status: 'Processing', price: '$26' },
        { productName: 'Halwa', orderDate: '08-30-2024', status: 'Shipped', price: '$21' },
        { productName: 'Sohan Halwa', orderDate: '08-31-2024', status: 'Delivered', price: '$29' },
    ]);

    const itemsPerPage = 5; // Number of items per page
    const [page, setPage] = useState(1);

    // Calculate the orders to display based on the current page
    const paginatedOrders = orders.slice(
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
                    <TableBody>
                        {paginatedOrders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>{order.productName}</TableCell>
                                <TableCell>{order.orderDate}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
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
