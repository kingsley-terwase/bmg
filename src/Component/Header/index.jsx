
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Menu,
    MenuItem,
    Container,
    Box,
    Typography,
} from '@mui/material';
import {
    KeyboardArrowDown,
    Phone,
} from '@mui/icons-material';
import { HeroSection } from '../Herosection';


const Header = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [anchorEls, setAnchorEls] = useState({});

    const handleMenuOpen = (event, menu) => {
        setAnchorEls({ ...anchorEls, [menu]: event.currentTarget });
    };

    const handleMenuClose = (menu) => {
        setAnchorEls({ ...anchorEls, [menu]: null });
    };

    const menuItems = [
        { label: 'Gigs', key: 'gigs' },
        { label: 'Services', key: 'services' },
        { label: 'Portfolio', key: 'portfolio' },
        { label: 'Resources', key: 'resources' },
        { label: 'Blogs', key: 'blogs' },
        { label: 'Gift Voucher', key: 'gift' }
    ];

    return (
        <Box>
      
            <AppBar
                position="sticky"
                elevation={0}
                sx={{borderRadius:0, boxShadow:0, backgroundColor: 'white', m:0}}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ borderRadius:0, py: 1,}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 4 }}>
                            <Box
                            component="img"
                                alt="Logo"
                                src="/Logo/Logo.png"
                                sx={{
                                    width: '80px',
                                    height: '100%',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                }}
                            />
                           
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, flexGrow: 1 }}>
                            {menuItems.map((item) => (
                                <Box key={item.key}>
                                    <Box
                                        onClick={(e) => handleMenuOpen(e, item.key)}
                                        endIcon={<KeyboardArrowDown />}
                                        sx={{
                                            color: '#374151',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            fontSize: '0.95rem',
                                            '&:hover': {
                                                backgroundColor: 'rgba(30, 58, 138, 0.05)'
                                            }
                                        }}
                                    >
                                        {item.label}
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEls[item.key]}
                                        open={Boolean(anchorEls[item.key])}
                                        onClose={() => handleMenuClose(item.key)}
                                    >
                                        <MenuItem onClick={() => handleMenuClose(item.key)}>Option 1</MenuItem>
                                        <MenuItem onClick={() => handleMenuClose(item.key)}>Option 2</MenuItem>
                                    </Menu>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems:'center', gap: 2 }}>
                            <Button
                                startIcon={<img src='/Icons/icons_1.png' style={{width: '100%', }} />}
                                sx={{
                                    color: '#374151',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    display: { xs: 'none', lg: 'flex' }
                                }}
                            >
                                +2349008709
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#fbbf24',
                                    color: 'white',
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: '#f59e0b',
                                        boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)'
                                    }
                                }}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {currentPage === 'home' && <HeroSection />}


        </Box>
    );
};

export default Header;