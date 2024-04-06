import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import T2I from './pages/T2I/T2I';
import Header from './components/Header/Header';
import { Box } from '@mui/material';
import Legal from './pages/Legal/Legal';
import T2IResults from './pages/T2I/T2IResults';

function App() {
  return (
    <Router>
      <Header />
      <Box paddingTop={'90px'}>
        <Routes>
          <Route
            path={'/'}
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path={'/t2i'}
            element={
              <>
                <T2I />
              </>
            }
          />
          <Route
            path={'/t2i/results'}
            element={
              <>
                <T2IResults />
              </>
            }
          />
          <Route
            path={'/legal'}
            element={
              <>
                <Legal />
              </>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
