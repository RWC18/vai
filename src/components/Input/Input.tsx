import { TextField } from '@mui/material';
import React from 'react';

interface Props {
  value: string;
  handleChange: (value: string) => void;
  placeholder: string;
}

const Input = ({ value, placeholder, handleChange }: Props) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(e: any) => handleChange(e.target.value)}
      variant='outlined'
      color='warning'
      fullWidth
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '50px', // Adjust the value as needed
          backgroundColor: 'white', // Set the background color
          padding: ' 0 20px',
        },
      }}
    />
  );
};

export default Input;
