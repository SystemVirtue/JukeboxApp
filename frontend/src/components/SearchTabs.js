import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import TouchKeyboard from './TouchKeyboard';

const SearchTabs = () => {
  const [value, setValue] = useState(0);
  const [input, setInput] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (input) => {
    setInput(input);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '20px' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Artist" />
        <Tab label="Song" />
        <Tab label="Album" />
        <Tab label="Genre" />
        <Tab label="Year" />
      </Tabs>
      <Typography variant="h6" style={{ marginTop: '20px' }}>Search Input: {input}</Typography>
      <TouchKeyboard onChange={handleInputChange} />
    </Box>
  );
};

export default SearchTabs;
