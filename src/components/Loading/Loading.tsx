import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backdropFilter: 'blur(10px)',
        backgroundColor: '#00000070',
        zIndex: 20,
      }}
    >
      <CircularProgress color='warning' size={'52px'} />
    </Box>
  );
};

export default Loading;
