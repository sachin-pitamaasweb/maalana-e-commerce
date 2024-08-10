import React, { useState } from 'react';
import { Button, IconButton, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.scss';


const dummyImageUrl = 'https://via.placeholder.com/100';
const WishListSection = () => {
    const wishListItems = [
        {
            id: 1,
            name: 'Orange Fruit Katli - 250 g',
            price: '₹150',
            imageUrl: dummyImageUrl
        },
        {
            id: 2,
            name: 'Orange Fruit Katli - 250 g',
            price: '₹150',
            imageUrl: dummyImageUrl
        },
        {
            id: 3,
            name: 'Orange Fruit Katli - 250 g',
            price: '₹150',
            imageUrl: dummyImageUrl,
        },
        {
            id: 4,
            name: 'Orange Fruit Katli - 250 g',
            price: '₹150',
            imageUrl: dummyImageUrl,
        },
        {
            id: 5,
            name: 'Orange Fruit Katli - 250 g',
            price: '₹150',
            imageUrl: dummyImageUrl,
        },
        {
            id: 6,
            name: 'Orange Fruit Katli - 250 g',
            price: '₹150',
            imageUrl: dummyImageUrl,
        },

    ];

    const itemsPerPage = 5; // Number of items per page
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const paginatedItems = wishListItems.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );


    return (
        <div className="wishlist-section">
            {paginatedItems.map(item => (
                <div key={item.id} className="wishlist-card">
                    <div className="wishlist-image">
                        <img src={item.imageUrl} alt={item.name} />
                    </div>
                    <div className="wishlist-details">
                        <h3>{item.name}</h3>
                        <span>{item.price}</span>
                    </div>
                    <div className="wishlist-actions">
                        <Button variant="outlined" className="cart-button">
                            ADD TO CART
                        </Button>
                        <IconButton className="delete-button">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            ))}
              <Pagination
                count={Math.ceil(wishListItems.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                className="wishlist-pagination"
                color="primary"
            />
        </div>
    );
};

export default WishListSection;
