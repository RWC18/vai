import { Box, Grid, Typography } from '@mui/material';
import { colors } from '../../constants/styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {
  genT2img,
  setSelectedStylesT2i,
  setT2iPrompt,
} from '../../redux/Actions/t2iActions';
import { genStyles } from '../../constants/genStyles';
import Style from '../../components/Style/Style';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

const T2I = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prompt = useSelector((state: any) => state.t2i.prompt);
  const loading = useSelector((state: any) => state.t2i.loading);
  const selectedStyles = useSelector((state: any) => state.t2i.selectedStyles);

  return (
    <Box sx={{ padding: { md: '12px 64px', xs: '8px 32px' } }}>
      {loading && <Loading />}
      <Typography
        sx={{
          color: colors.ORANGE_LIGHT,
          textAlign: 'center',
          fontSize: { md: '48px', xs: '32px' },
          fontWeight: '900',
        }}
      >
        Text{' '}
        <Typography
          component={'span'}
          sx={{
            color: colors.TEXT_WHITE,
            textAlign: 'center',
            fontSize: { md: '48px', xs: '32px' },
            fontWeight: '900',
          }}
        >
          to
        </Typography>{' '}
        Image
      </Typography>
      <Typography
        sx={{
          color: colors.TEXT_GRAY,
          textAlign: 'center',
          fontSize: { md: '18px', xs: '16px' },
          fontWeight: '300',
        }}
      >
        Let AI-powered image maker generate your images!
      </Typography>
      <Box
        sx={{
          marginTop: { md: '24px', xs: '18px' },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Input
              placeholder='The cat sitting near piano ...'
              value={prompt}
              handleChange={(value: string) =>
                dispatch<any>(setT2iPrompt(value))
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1}>
            <Button
              title='Generate'
              handleClick={() => {
                navigate('/t2i/results');
                const styles = selectedStyles.map(
                  (style: {
                    prompt: string;
                    thumbnail: string;
                    title: string;
                  }) => style.prompt
                );
                dispatch<any>(genT2img(prompt + ', ' + styles.join(', ')));
              }}
              textColor={colors.TEXT_DARK}
              bgColor={colors.ORANGE_ACTIVE}
              padding='14px 0px'
              hoverColor={colors.ORANGE_LIGHT}
              isDisabled={prompt.trim().length <= 0}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ justifyContent: 'center', display: 'flex', marginTop: '42px' }}
      >
        <Grid
          container
          flexWrap={'wrap'}
          justifyContent={'space-between'}
          alignItems={'top'}
          width={{ md: '60%', xs: '100%' }}
          spacing={{ md: 6, xs: 1 }}
        >
          {genStyles.map(
            (style: { prompt: string; title: string; thumbnail: string }) => (
              <Grid item sm={4} md={2} lg={2} xs={4}>
                <Style
                  title={style.title}
                  thumbnail={style.thumbnail}
                  isSelected={selectedStyles.includes(style)}
                  onSelect={() => dispatch<any>(setSelectedStylesT2i(style))}
                />
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default T2I;
