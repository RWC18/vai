import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { colors } from '../../constants/styles';
import { menuItems } from '../../constants/menu';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        padding: '22px 64px',
        width: '100%',
        position: 'fixed',
        background: scrolling ? '#00000070' : 'transparent',
        backdropFilter: 'blur(10px)',
        transition: '.5s',
        zIndex: '19'
      }}
    >
      <Grid
        container
        justifyContent={'flex-start'}
        alignItems={'center'}
        spacing={6}
      >
        <Grid item>
          <img
            src='/logo.svg'
            alt='logo VAi'
            style={{ width: '60px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent={'flex-start'}
            alignItems={'center'}
            spacing={4}
          >
            {menuItems.map((menuItem: { title: string; url: string }) => (
              <Grid item key={menuItem.url}>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color:
                      location.pathname !== menuItem.url
                        ? colors.TEXT_GRAY
                        : colors.ORANGE_ACTIVE,
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: '.5s',
                    '&:hover': {
                      color: colors.ORANGE_LIGHT,
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => navigate(menuItem.url)}
                >
                  {menuItem.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
