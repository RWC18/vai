import { Box, Grid, Typography } from '@mui/material';
import { colors as styleColors } from '../../constants/styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { industriesData } from '../../constants/genIndustries';
import { genColors } from '../../constants/genColors';
import Industry from './Industry';
import {
  genLogo,
  setLogoBrandname,
  setLogoTagline,
  setSelectedColorLogoGen,
  setSelectedIndustryLogoGen,
} from '../../redux/Actions/logoGenActions';
import OneColor from './Colors';

const LogoGen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { brandname, tagline, colors, industries, count, loading } =
    useSelector((state: any) => state.logo);

  return (
    <Box sx={{ padding: { md: '12px 64px', xs: '8px 32px' } }}>
      {loading && <Loading />}
      <Typography
        sx={{
          color: styleColors.ORANGE_LIGHT,
          textAlign: 'center',
          fontSize: { md: '48px', xs: '32px' },
          fontWeight: '900',
        }}
      >
        New Logo{' '}
        <Typography
          component={'span'}
          sx={{
            color: styleColors.TEXT_WHITE,
            textAlign: 'center',
            fontSize: { md: '48px', xs: '32px' },
            fontWeight: '900',
          }}
        >
          &
        </Typography>{' '}
        Brand Design
      </Typography>
      <Typography
        sx={{
          color: styleColors.TEXT_GRAY,
          textAlign: 'center',
          fontSize: { md: '18px', xs: '16px' },
          fontWeight: '300',
        }}
      >
        Let AI-powered logo maker generate your new logo, create matching
        stationery, and design a brand you love!
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
              placeholder='Brandname*'
              value={brandname}
              handleChange={(value: string) =>
                dispatch<any>(setLogoBrandname(value))
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Input
              placeholder='Tagline (Optional)'
              value={tagline}
              handleChange={(value: string) =>
                dispatch<any>(setLogoTagline(value))
              }
            />
          </Grid>
          <Grid
            item
            md={0}
            sm={12}
            lg={0}
            xs={12}
            sx={{
              display: { md: 'none', xs: 'block' },
            }}
          >
            <Button
              title='Generate'
              handleClick={() => {
                navigate('/logo-gen/results');
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
              isDisabled={
                brandname.trim().length === 0 ||
                colors.length === 0 ||
                industries.length === 0
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          justifyContent: 'center',
          display: 'flex',
          marginTop: '42px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          flexWrap={'wrap'}
          justifyContent={'space-between'}
          alignItems={'top'}
          width={{ md: '70%', xs: '100%' }}
          spacing={{ md: 4, xs: 1 }}
          columns={{ md: 9, xs: 3 }}
        >
          {industriesData.map(
            (industry: { title: string; id: string; icon: JSX.Element }) => (
              <Grid item sm={1} md={1} lg={1} xs={1} key={industry.id}>
                <Industry
                  industry={industry}
                  isActive={industries[0] === industry.id}
                  onSelect={() =>
                    dispatch<any>(setSelectedIndustryLogoGen(industry.id))
                  }
                />
              </Grid>
            )
          )}
        </Grid>
        <Grid
          container
          flexWrap={'wrap'}
          justifyContent={'space-between'}
          alignItems={'top'}
          width={'80%'}
          marginTop={'32px'}
          marginBottom={'32px'}
          spacing={0}
          columns={{ md: 10, xs: 2 }}
        >
          {genColors.map((clr: { title: string; thumbnail: string }) => (
            <Grid item sm={1} md={1} lg={1} xs={1} key={clr.title}>
              <OneColor
                color={clr}
                isActive={colors[0] === clr.title}
                onSelect={() =>
                  dispatch<any>(setSelectedColorLogoGen(clr.title))
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Grid
        container
        sx={{
          display: { md: 'flex', xs: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '28px',
          marginBottom: '28px',
        }}
      >
        <Grid item md={1} sm={1} lg={1} xs={12}>
          <Button
            title='Generate'
            handleClick={() => {
              navigate('/logo-gen/results');
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
            isDisabled={
              brandname.trim().length === 0 ||
              colors.length === 0 ||
              industries.length === 0
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogoGen;
