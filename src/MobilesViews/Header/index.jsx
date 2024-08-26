import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Typography } from '@mui/material';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useMediaQuery from '@mui/material/useMediaQuery';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';

import './Header.scss';
import Logo from '../../assets/logo/Maalana-logo.png';
import { navLinks } from '../../constants/helper.js';

import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 899px)');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    // const [cartItemCount, setCartItemCount] = useState(0);
    const { isUserAuthenticated, userId, cartItemCount, updateCartItemCount } = useAuth();

    //  const isLogin = sessionStorage.getItem('isUserAuthenticated');
    console.log('isUserAuthenticated', isUserAuthenticated);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        console.log('link', link);
        if (isMobile) {
            setDrawerOpen(false);
        }
        navigate(link)
    };


    useEffect(() => {
        const fetchCartItems = async () => {
            if (isUserAuthenticated) {
                try {
                    const response = await fetch(`http://localhost:8000/api/get-all-cart-by-user/${userId}`);
                    const data = await response.json();

                    if (data.success) {
                        const totalItems = data.cart.reduce((acc, cartItem) => acc + cartItem.items.length, 0);
                        updateCartItemCount(totalItems);
                    }
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        fetchCartItems();
    }, [isUserAuthenticated, userId, updateCartItemCount]);

    // console.log('productLength', productLength);
    return (
        <header className="header">
            <div className="logo">
                <img src={Logo} alt="Landmark Homes" />
            </div>
            {isMobile && (
                <Stack spacing={4} direction="row" alignItems="center">
                    {isUserAuthenticated ? <Badge badgeContent={cartItemCount} color="secondary">
                        <Link className="iconButton">
                            <ShoppingCart sx={{ color: '#000 !important' }} />
                        </Link>
                    </Badge>
                        : <Link className="iconButton">
                            <ShoppingCart sx={{ color: '#000 !important' }} />
                        </Link>

                    }
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <MenuIcon className="menu-icon" />
                    </IconButton>
                </Stack>
            )}
            <nav className="nav">
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <Link
                                to={link.link}
                                className={link.link === activeLink ? 'active' : 'active'}
                                onClick={() => handleLinkClick(link.link)}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {!isMobile && (

                <div className="icons">
                    <Stack spacing={4} direction="row">
                        {isUserAuthenticated ? <Badge badgeContent={cartItemCount} color="secondary">
                            <Link to="/cart" className="iconButton">
                                <ShoppingCart />
                            </Link>
                        </Badge> : <Link to="/cart" className="iconButton">
                            <ShoppingCart />
                        </Link>
                        }
                        {isUserAuthenticated ? <Link to={`/profile/${userId}`} className="iconButton">
                            <AccountCircle />
                        </Link>
                            : <Link to="/login" className="iconButton">
                                <Typography variant="body1">Login</Typography>
                            </Link>
                        }
                    </Stack>
                </div>
            )}
            {isMobile && (
                <>
                    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                        <div className="drawer">
                            <List>
                                {navLinks.map((link) => (
                                    <ListItem
                                        key={link.id}
                                        button
                                        component={Link}
                                        to={link.link}
                                        selected={link.link === activeLink}
                                        onClick={() => handleLinkClick(link.link)}
                                    >
                                        <ListItemText primary={link.title} />
                                    </ListItem>
                                ))}
                                <ListItem button component={Link} to={`/profile/${userId}`}>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </>
            )}
        </header>
    );
};

export default Header;
