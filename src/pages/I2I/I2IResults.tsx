import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { Box, Grid, Typography } from '@mui/material';
import { colors } from '../../constants/styles';
import {
  genI2img,
  setSelectedStylesI2i,
  setI2iPrompt,
  uploaderI2I,
} from '../../redux/Actions/i2iActions';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { genStyles } from '../../constants/genStyles';
import Style from '../../components/Style/Style';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import { forceDownload } from '../../redux/Actions/mainActions';

const I2IResults = () => {
  const dispatch = useDispatch();

  const prompt = useSelector((state: any) => state.i2i.prompt);
  const loading = useSelector((state: any) => state.i2i.loading);
  const results = useSelector((state: any) => state.i2i.results);
  const selectedStyles = useSelector((state: any) => state.i2i.selectedStyles);
  const image_url = useSelector((state: any) => state.i2i.image_url);

  const [zoomStatus, setZoomStatus] = useState(false);
  const [zoomedImageUrl, setZoomedImageUrl] = useState(null);

  const handleImageChange = async (file: any) => {
    debugger;
    if (file) {
      let data = new FormData();
      data.append('image', file);
      await dispatch<any>(uploaderI2I(data));
    }
  };

  return (
    <Box sx={{ padding: '12px 154px 12px 64px' }}>
      {zoomedImageUrl && zoomStatus && (
        <ZoomImage
          url={zoomedImageUrl}
          handleClose={() => {
            setZoomStatus(false);
          }}
        />
      )}
      {loading && <Loading />}
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item xs={5} sm={5} lg={5} md={5}>
          <Typography
            sx={{
              color: colors.ORANGE_LIGHT,
              fontSize: '48px',
              fontWeight: '900',
              marginBottom: '18px',
            }}
          >
            Image
            <Typography
              component={'span'}
              sx={{
                color: colors.TEXT_WHITE,
                fontSize: '48px',
                fontWeight: '900',
              }}
            >
              {' '}
              to{' '}
            </Typography>
            Image
          </Typography>
          <Input
            placeholder='The cat sitting near piano ...'
            value={prompt}
            handleChange={(value: string) => dispatch<any>(setI2iPrompt(value))}
          />
          <Box sx={{ marginTop: '18px' }}>
            <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
              <Grid item lg={2} md={2} sm={2}>
                <input
                  accept='image/*'
                  id='image-upload'
                  type='file'
                  style={{ display: 'none' }}
                  onChange={(e: any) => handleImageChange(e.target.files[0])}
                />
                <label htmlFor='image-upload'>
                  <Box
                    sx={{
                      background: `url(${image_url}) center center / contain`,
                      backgroundRepeat: 'no-repeat',
                      width: '100%',
                      aspectRatio: '1/1',
                    }}
                  />
                </label>
              </Grid>
              <Grid item lg={10} md={10} sm={10}>
                <Button
                  title='Generate'
                  handleClick={() => {
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

          <Grid
            container
            flexWrap={'wrap'}
            justifyContent={'flex-start'}
            alignItems={'top'}
            sx={{
              maxHeight: '600px',
              overflowX: 'hidden',
              overflowY: 'scroll',
              marginTop: '42px',
            }}
            spacing={2}
          >
            {genStyles.map(
              (style: { prompt: string; title: string; thumbnail: string }) => (
                <Grid
                  item
                  sm={2}
                  md={2}
                  lg={2}
                  xs={2}
                  key={style.title}
                  sx={{ paddingTop: '0px !important', marginBottom: '12px' }}
                >
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
        </Grid>
        <Grid item xs={5} sm={5} lg={5} md={5}>
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
            flexWrap={'wrap'}
            spacing={4}
          >
            {results &&
              results.map((image: any) => (
                <Grid item xs={6} sm={6} lg={6} md={6} key={image.id}>
                  <Box
                    sx={{
                      background: `url('${image.url}')`,
                      width: '100%',
                      aspectRatio: '1/1',
                      overflow: 'hidden',
                      backgroundSize: '100%',
                      backgroundPosition: 'center center',
                      transition: '.5s',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        backgroundSize: '105%',
                        '& div': {
                          transform: 'translate(0)',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 6,
                        top: 6,
                        transform: 'translate(110%)',
                        transition: '.5s',
                      }}
                    >
                      <Grid container alignItems={'center'} spacing={1}>
                        <Grid
                          item
                          sx={{
                            transition: '.3s',
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'scale(.95)',
                            },
                          }}
                          onClick={() => forceDownload(image.url)}
                        >
                          <Box
                            sx={{
                              backgroundColor: colors.ORANGE_LIGHT,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '6px',
                              borderRadius: '50px',
                              boxShadow: `0px 0px 4px 0px ${colors.TEXT_DARK}`,
                            }}
                          >
                            <CloudDownloadIcon
                              htmlColor={colors.TEXT_DARK}
                              fontSize='small'
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            transition: '.3s',
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'scale(.95)',
                            },
                          }}
                          onClick={() => {
                            setZoomStatus(true);
                            setZoomedImageUrl(image.url);
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: colors.ORANGE_LIGHT,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '6px',
                              borderRadius: '50px',
                              boxShadow: `0px 0px 4px 0px ${colors.TEXT_DARK}`,
                            }}
                          >
                            <ZoomInIcon
                              htmlColor={colors.TEXT_DARK}
                              fontSize='small'
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default I2IResults;
