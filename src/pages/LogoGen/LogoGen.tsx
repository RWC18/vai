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
    <Box sx={{ padding: '12px 64px' }}>
      {loading && <Loading />}
      <Typography
        sx={{
          color: styleColors.ORANGE_LIGHT,
          textAlign: 'center',
          fontSize: '48px',
          fontWeight: '900',
        }}
      >
        New Logo{' '}
        <Typography
          component={'span'}
          sx={{
            color: styleColors.TEXT_WHITE,
            textAlign: 'center',
            fontSize: '48px',
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
          fontSize: '18px',
          fontWeight: '300',
        }}
      >
        Let AI-powered logo maker generate your new logo, create matching
        stationery, and design a brand you love!
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
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Input
              placeholder='Brandname*'
              value={brandname}
              handleChange={(value: string) =>
                dispatch<any>(setLogoBrandname(value))
              }
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Input
              placeholder='Tagline (Optional)'
              value={tagline}
              handleChange={(value: string) =>
                dispatch<any>(setLogoTagline(value))
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
          width={'70%'}
          spacing={4}
          columns={9}
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
          spacing={0}
          columns={10}
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '28px',
        }}
      >
        <Grid item md={1} sm={1} lg={1}>
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
            isDisabled={false}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogoGen;
