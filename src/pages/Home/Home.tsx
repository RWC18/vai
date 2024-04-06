import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../../constants/styles';
import { products } from '../../constants/products';
import Product from '../../components/Product/Product';

const Home = () => {
  return (
    <Box sx={{ padding: '24px 64px' }}>
      <Grid
        container
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        sx={{ textAlign: 'center' }}
      >
        <Grid item>
          <Typography
            sx={{
              color: colors.TEXT_WHITE,
              fontSize: '58px',
              fontWeight: '800',
            }}
          >
            Powering creativity with AI innovation
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={{
              color: colors.TEXT_GRAY,
              fontSize: '22px',
              fontWeight: '300',
            }}
          >
            At VAi Research, we imagine a future where cutting-edge artificial
            intelligence opens the door to radical creativity. We’re passionate
            about exploring new frontiers in creative communication, and
            harnessing the power of AI to drive innovation.
          </Typography>
        </Grid>
      </Grid>
      <Box marginTop={'64px'}>
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
  );
};

export default Home;
