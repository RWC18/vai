import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../../constants/styles';
import { products } from '../../constants/products';
import Product from '../../components/Product/Product';
import { pluses } from '../../constants/pluses';
import { scrollTO } from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../../constants/menu';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ padding: '24px 64px' }}>
        <Grid container justifyContent={'center'} alignItems={'center'}>
          <Grid item md={8} lg={8} xs={8} sm={8}>
            <Typography
              sx={{
                marginBottom: '32px',
                marginTop: '32px',
                color: colors.TEXT_WHITE,
                fontSize: '64px',
                fontWeight: '800',
                textAlign: 'center',
              }}
            >
              Powering creativity with{' '}
              <Typography
                component={'span'}
                sx={{
                  color: colors.ORANGE_LIGHT,
                  fontSize: '64px',
                  fontWeight: '800',
                }}
              >
                {' '}
                <br />
                AI innovation
              </Typography>
            </Typography>
            <Typography
              sx={{
                color: colors.TEXT_GRAY,
                fontSize: '32px',
                fontWeight: '300',
                textAlign: 'center',
                marginBottom: '32px',
              }}
            >
              At VAi Research, we imagine a future where cutting-edge artificial
              intelligence opens the door to radical creativity. We’re
              passionate about exploring new frontiers in creative
              communication, and harnessing the power of AI to drive innovation.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          height: '400px',
          backgroundImage: `url("/landing/top-final-1.png")`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          // backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
        }}
      />
      <Box sx={{ padding: '24px 64px' }}>
        <Typography
          id='about'
          sx={{
            color: colors.TEXT_WHITE,
            fontSize: '48px',
            fontWeight: '800',
            textAlign: 'center',
            marginTop: '54px',
            marginBottom: '24px',
          }}
        >
          Unlock Your Creative Potential with VAi
        </Typography>
        <Typography
          sx={{
            color: colors.TEXT_GRAY,
            fontSize: '24px',
            fontWeight: '300',
            textAlign: 'center',
          }}
        >
          At VAi, we empower you to turn your ideas into reality with ease.
          Whether you're transforming text into captivating images, enhancing
          photos into stunning artworks, or crafting professional logos, Vai has
          you covered.
        </Typography>
        <Grid
          container
          justifyContent={'space-between'}
          spacing={5}
          alignItems={'stretch'}
          marginTop={'32px'}
        >
          {pluses.map(
            (
              plus: { title: string; description: string; icon: JSX.Element },
              id: any
            ) => (
              <Grid item md={4} sm={4} lg={4} key={id}>
                <Box
                  sx={{
                    border: `1px solid ${colors.GRAY_LIGHT}50`,
                    padding: '24px 32px',
                    borderRadius: '16px',
                    transition: '.5s',
                    height: '100%',
                    '&:hover': {
                      border: `1px solid ${colors.ORANGE_LIGHT}`,
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: colors.ORANGE_ACTIVE,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    {plus.icon}
                  </Box>
                  <Typography
                    sx={{
                      color: colors.ORANGE_LIGHT,
                      fontSize: '32px',
                      fontWeight: '700',
                      marginBottom: '12px',
                    }}
                  >
                    {plus.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: colors.TEXT_GRAY,
                      fontSize: '24px',
                      fontWeight: '300',
                    }}
                  >
                    {plus.description}
                  </Typography>
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </Box>
      <Box sx={{ padding: '24px 64px' }}>
        <Box marginTop={'64px'}>
          <Typography
            id='products'
            sx={{
              color: colors.TEXT_WHITE,
              fontSize: '48px',
              fontWeight: '800',
              textAlign: 'center',
            }}
          >
            Products
          </Typography>
          {products.map(
            (
              product: {
                title: string;
                url: string;
                thumbnail: string;
                description: string;
              },
              id
            ) => (
              <Product {...product} reverse={(id + 1) % 2 === 0} key={id} />
            )
          )}
        </Box>
      </Box>
      <Box
        sx={{
          padding: '24px 64px',
          borderTop: `1px solid ${colors.ORANGE_LIGHT}`,
        }}
      >
        <Grid container alignItems={'center'} justifyContent={'space-between'}>
          <Grid item>
            <img
              src='/logo.svg'
              alt='logo VAi'
              style={{ width: '60px', cursor: 'pointer' }}
              onClick={() => scrollTO('undef')}
            />
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              {menuItems.map((menuItem: { title: string; url: string }) => (
                <Grid item key={menuItem.title}>
                  <Typography
                    onClick={() => scrollTO(menuItem.url)}
                    sx={{
                      color: colors.TEXT_GRAY,
                      transition: '.3s',
                      fontSize: '18px',
                      cursor: 'pointer',
                      '&:hover': {
                        color: colors.ORANGE_LIGHT,
                      },
                    }}
                  >
                    {menuItem.title}
                  </Typography>
                </Grid>
              ))}
              {products.map(
                (
                  product: {
                    title: string;
                    url: string;
                    thumbnail: string;
                    description: string;
                  },
                  id
                ) => (
                  <Grid item key={id}>
                    <Typography
                      onClick={() => navigate(product.url)}
                      sx={{
                        color: colors.TEXT_GRAY,
                        transition: '.3s',
                        fontSize: '18px',
                        cursor: 'pointer',
                        '&:hover': {
                          color: colors.ORANGE_LIGHT,
                        },
                      }}
                    >
                      {product.title}
                    </Typography>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                color: colors.TEXT_GRAY,
                fontSize: '12px',
              }}
            >
              © {new Date().getFullYear()} VAi, Inc.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
