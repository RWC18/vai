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
      <Box sx={{ padding: { md: '24px 64px', xs: '12px 32px' } }}>
        <Grid container justifyContent={'center'} alignItems={'center'}>
          <Grid item md={8} lg={8} xs={12} sm={12}>
            <Typography
              sx={{
                marginBottom: { md: '32px', xs: '12px' },
                marginTop: { md: '32px', xs: '12px' },
                color: colors.TEXT_WHITE,
                fontSize: { md: '64px', xs: '32px' },
                fontWeight: '800',
                textAlign: 'center',
              }}
            >
              Powering creativity with{' '}
              <Typography
                component={'span'}
                sx={{
                  color: colors.ORANGE_LIGHT,
                  fontSize: { md: '64px', xs: '32px' },
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
                fontSize: { md: '32', xs: '18px' },
                fontWeight: '300',
                textAlign: 'center',
                marginBottom: { md: '32', xs: '12px' },
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
          backgroundAttachment: { md: 'fixed', xs: 'default' },
          backgroundSize: { md: 'cover', xs: 'contain' },
          backgroundRepeat: { md: 'repeat', xs: 'no-repeat' },
          backgroundPosition: 'top',
        }}
      />
      <Box sx={{ padding: { md: '24px 64px', xs: '12px 32px' } }}>
        <Typography
          id='about'
          sx={{
            color: colors.TEXT_WHITE,
            fontSize: { md: '48px', xs: '24px' },
            fontWeight: '800',
            textAlign: 'center',
            marginTop: { md: '54px', xs: '22px' },
            marginBottom: '24px',
          }}
        >
          Unlock Your Creative Potential with VAi
        </Typography>
        <Typography
          sx={{
            color: colors.TEXT_GRAY,
            fontSize: { md: '24px', xs: '16px' },
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
          marginTop={{ md: '32px', xs: '12px' }}
        >
          {pluses.map(
            (
              plus: { title: string; description: string; icon: JSX.Element },
              id: any
            ) => (
              <Grid item md={4} sm={4} lg={4} xs={12} key={id}>
                <Box
                  sx={{
                    border: `1px solid ${colors.GRAY_LIGHT}50`,
                    padding: { md: '24px 32px', xs: '18px' },
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
                      width: { md: '52px', xs: '48px' },
                      height: { md: '52px', xs: '48px' },
                      borderRadius: { md: '12px', xs: '8px' },
                      marginBottom: { md: '12px', xs: '8px' },
                    }}
                  >
                    {plus.icon}
                  </Box>
                  <Typography
                    sx={{
                      color: colors.ORANGE_LIGHT,
                      fontSize: { md: '32px', xs: '20px' },
                      fontWeight: '700',
                      marginBottom: '12px',
                    }}
                  >
                    {plus.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: colors.TEXT_GRAY,
                      fontSize: { md: '24px', xs: '16px' },
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
      <Box sx={{ padding: { md: '24px 64px', xs: '12px 32px' } }}>
        <Box marginTop={{ md: '64px', xs: '32px' }}>
          <Typography
            id='products'
            sx={{
              color: colors.TEXT_WHITE,
              fontSize: { md: '48px', xs: '24px' },
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
          padding: { md: '24px 64px', xs: '12px 32px' },
          borderTop: `1px solid ${colors.ORANGE_LIGHT}`,
        }}
      >
        <Grid
          container
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={{ md: 'row', xs: 'column' }}
        >
          <Grid item>
            <img
              src='/logo.svg'
              alt='logo VAi'
              style={{ width: '60px', cursor: 'pointer' }}
              onClick={() => scrollTO('undef')}
            />
          </Grid>
          <Grid item>
            <Grid
              container
              spacing={2}
              flexDirection={{ md: 'row', xs: 'column' }}
            >
              {menuItems.map((menuItem: { title: string; url: string }) => (
                <Grid item key={menuItem.title}>
                  <Typography
                    onClick={() => scrollTO(menuItem.url)}
                    sx={{
                      textAlign: 'center',
                      color: colors.TEXT_GRAY,
                      transition: '.3s',
                      fontSize: { md: '18px', xs: '12px' },
                      marginTop: { md: '0px', xs: '4px' },
                      marginBottom: { md: '0px', xs: '4px' },
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
                        textAlign: 'center', 
                        transition: '.3s',
                        fontSize: { md: '18px', xs: '12px' },
                        cursor: 'pointer',
                        marginTop: { md: '0px', xs: '4px' },
                        marginBottom: { md: '0px', xs: '4px' },
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
                fontSize: { md: '12px', xs: '8px' },
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
