import { Box, Grid, Typography, IconButton } from '@mui/material';
import { colors } from '../../constants/styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
  genI2img,
  setSelectedStylesI2i,
  setI2iPrompt,
} from '../../redux/Actions/i2iActions';
import { genStyles } from '../../constants/genStyles';
import Style from '../../components/Style/Style';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { PhotoCamera } from '@mui/icons-material';
import { useState } from 'react';
import { uploaderI2I } from '../../redux/Actions/i2iActions';

const I2I = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prompt = useSelector((state: any) => state.i2i.prompt);
  const loading = useSelector((state: any) => state.i2i.loading);
  const selectedStyles = useSelector((state: any) => state.i2i.selectedStyles);
  const image_url = useSelector((state: any) => state.i2i.image_url);

  const [imageLoading, setImageLoading] = useState(false);

  const handleImageChange = async (file: any) => {
    debugger;
    if (file) {
      setImageLoading(true);
      let data = new FormData();
      data.append('image', file);
      await dispatch<any>(uploaderI2I(data));
      setImageLoading(false);
    }
  };

  return (
    <Box sx={{ padding: '12px 64px' }}>
      {loading && <Loading />}
      <Typography
        sx={{
          color: colors.ORANGE_LIGHT,
          textAlign: 'center',
          fontSize: '48px',
          fontWeight: '900',
        }}
      >
        Image{' '}
        <Typography
          component={'span'}
          sx={{
            color: colors.TEXT_WHITE,
            textAlign: 'center',
            fontSize: '48px',
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
          fontSize: '18px',
          fontWeight: '300',
        }}
      >
        Let AI-powered image maker generate your images!
      </Typography>
      <Box
        sx={{
          marginTop: '24px',
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
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <input
              accept='image/*'
              id='image-upload'
              type='file'
              style={{ display: 'none' }}
              onChange={(e: any) => handleImageChange(e.target.files[0])}
            />
            <label htmlFor='image-upload'>
              {image_url ? (
                <Box
                  sx={{
                    background: `url(${image_url}) center center / contain`,
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    aspectRatio: '1/1',
                  }}
                />
              ) : (
                <IconButton
                  component='span'
                  sx={{
                    border: `1px solid ${colors.TEXT_GRAY}`,
                    width: '100%',
                    aspectRatio: '1/1',
                    borderRadius: '12px',
                    transition: '.5s',
                    '&:hover': {
                      border: `1px solid ${colors.ORANGE_LIGHT}`,
                      '& svg': {
                        fill: colors.ORANGE_LIGHT,
                      },
                    },
                  }}
                >
                  <PhotoCamera htmlColor={colors.TEXT_GRAY} />
                </IconButton>
              )}
            </label>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Input
              placeholder='The cat sitting near piano ...'
              value={prompt}
              handleChange={(value: string) =>
                dispatch<any>(setI2iPrompt(value))
              }
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <Button
              title='Generate'
              handleClick={() => {
                navigate('/i2i/results');
                const styles = selectedStyles.map(
                  (style: {
                    prompt: string;
                    thumbnail: string;
                    title: string;
                  }) => style.prompt
                );
                dispatch<any>(
                  genI2img(prompt + ', ' + styles.join(', '), image_url)
                );
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
          width={'60%'}
          spacing={6}
        >
          {genStyles.map(
            (style: { prompt: string; title: string; thumbnail: string }) => (
              <Grid item sm={2} md={2} lg={2} xs={2}>
                <Style
                  title={style.title}
                  thumbnail={style.thumbnail}
                  isSelected={selectedStyles.includes(style)}
                  onSelect={() => dispatch<any>(setSelectedStylesI2i(style))}
                />
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default I2I;
