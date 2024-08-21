import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination
} from '@mui/material';
import './style.scss'; // Correct the import path if needed

const MyOrdersTable = () => {
    const [orders] = useState([]);

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
                    {orders.length > 0 ? (
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
