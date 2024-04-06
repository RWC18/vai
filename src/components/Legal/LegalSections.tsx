import { Box, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../../constants/styles';

interface Props {
  title: string;
  description: string;
}

const LegalSections = ({ title, description }: Props) => {
  return (
    <Box sx={{ marginTop: '28px' }}>
      <Typography
        sx={{
          color: colors.TEXT_WHITE,
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: '500',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: colors.TEXT_GRAY,
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: '400',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default LegalSections;
