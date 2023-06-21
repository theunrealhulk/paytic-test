import React from 'react';
import './App.scss';
import DropZone from './components/DropZone';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


function App() {
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item md={6}>
          <DropZone title="Drop Zone 1"/>          
        </Grid>
        <Grid item md={6}>
          <DropZone title="Drop Zone 2"/>
        </Grid>
      </Grid>
      <Grid>
        <Grid item md={12}>
            <Button variant="outlined">Save</Button>
        </Grid>
        <Grid item md={12}>
            {/* Drop Zone 2 Data Table */}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;