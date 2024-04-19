import React from 'react';
import { Grid, Typography } from '@mui/material';
import Button from '../Button/Button';
import { colors } from '../../constants/styles';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  url: string;
  thumbnail: string;
  description: string;
  reverse: boolean;
}

const Product = ({ title, url, thumbnail, description, reverse }: Props) => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      flexWrap={'nowrap'}
      flexDirection={reverse ? 'row-reverse' : 'row'}
      spacing={3}
      sx={{
        width: '100%',
        margin: '10px 0px',
      }}
      columns={{ xs: 6, sm: 6, md: 6, lg: 6 }}
    >
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <Grid
          container
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          spacing={5}
          flexDirection={'column'}
        >
          <Grid item>
            <Typography
              sx={{
                color: colors.ORANGE_LIGHT,
                fontSize: '48px',
                fontWeight: '800',
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                color: colors.TEXT_GRAY,
                fontSize: '24px',
                fontWeight: '300',
              }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              isDisabled={false}
              title='Generate'
              handleClick={() => navigate(url)}
              textColor={colors.TEXT_DARK}
              bgColor={colors.ORANGE_ACTIVE}
              hoverColor={colors.ORANGE_LIGHT}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        <img src={`/Products/${thumbnail}`} width={'100%'} alt={title} />
      </Grid>
    </Grid>
  );
};

export default Product;
