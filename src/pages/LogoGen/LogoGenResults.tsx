import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { Box, Grid, Typography } from '@mui/material';
import { colors as styleColors } from '../../constants/styles';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Button from '../../components/Button/Button';
import ZoomImage from '../../components/ZoomImage/ZoomImage';
import { forceDownload } from '../../redux/Actions/mainActions';
import { genLogo } from '../../redux/Actions/logoGenActions';
import { useNavigate } from 'react-router-dom';

const LogoGenResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { results, loading, brandname, tagline, colors, industries, count } =
    useSelector((state: any) => state.logo);

  const [zoomStatus, setZoomStatus] = useState(false);
  const [zoomedImageUrl, setZoomedImageUrl] = useState(null);

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
      <Typography
        sx={{
          color: styleColors.TEXT_WHITE,
          fontSize: '48px',
          fontWeight: '900',
          marginBottom: '18px',
          textAlign: 'center',
        }}
      >
        AI made these Logos{' '}
        <Typography
          component={'span'}
          sx={{
            color: styleColors.ORANGE_LIGHT,
            fontSize: '48px',
            fontWeight: '900',
          }}
        >
          For You
        </Typography>
      </Typography>
      {loading && <Loading />}
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={8} sm={8} lg={8} md={8}>
          <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
            flexWrap={'wrap'}
            spacing={4}
          >
            {results &&
              results.map((image: any) => (
                <Grid item xs={4} sm={4} lg={4} md={4} key={image.id}>
                  <Box
                    sx={{
                      background: `url('${image.result_cdn_url}')`,
                      width: '100%',
                      aspectRatio: '1/1',
                      overflow: 'hidden',
                      backgroundSize: '100%',
                      backgroundPosition: 'center center',
                      transition: '.5s',
                      borderRadius: '16px',
                      border: `1px solid ${styleColors.ORANGE_LIGHT}`,
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        transform: 'scale(0.98)',
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
                          onClick={() => forceDownload(image.result_cdn_url)}
                        >
                          <Box
                            sx={{
                              backgroundColor: styleColors.ORANGE_LIGHT,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '6px',
                              borderRadius: '50px',
                              boxShadow: `0px 0px 4px 0px ${styleColors.TEXT_DARK}`,
                            }}
                          >
                            <CloudDownloadIcon
                              htmlColor={styleColors.TEXT_DARK}
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
                            setZoomedImageUrl(image.result_cdn_url);
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: styleColors.ORANGE_LIGHT,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '6px',
                              borderRadius: '50px',
                              boxShadow: `0px 0px 4px 0px ${styleColors.TEXT_DARK}`,
                            }}
                          >
                            <ZoomInIcon
                              htmlColor={styleColors.TEXT_DARK}
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
        {results.length > 0 && (
          <Grid item xs={8} sm={8} lg={8} md={8} marginTop={'24px'}>
            <Grid container justifyContent={'flex-end'} width={'100%'}>
              <Grid item xs={2} sm={2} lg={2} md={2} marginRight={'12px'}>
                <Button
                  title='Back'
                  handleClick={() => {
                    navigate('/logo-gen');
                  }}
                  textColor={styleColors.TEXT_DARK}
                  bgColor={styleColors.GRAY_LIGHT}
                  padding='14px 0px'
                  hoverColor={styleColors.GRAY_DARK}
                  isDisabled={false}
                />
              </Grid>
              <Grid item xs={3} sm={3} lg={3} md={3}>
                <Button
                  title='Regenerate'
                  handleClick={() => {
                    dispatch<any>(
                      genLogo(
                        {
                          tagline: tagline,
                          text_prompt: brandname,
                          industries: industries,
                          palettes: colors,
                        },
                        count
                      )
                    );
                  }}
                  textColor={styleColors.TEXT_DARK}
                  bgColor={styleColors.ORANGE_ACTIVE}
                  padding='14px 0px'
                  hoverColor={styleColors.ORANGE_LIGHT}
                  isDisabled={false}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default LogoGenResults;
