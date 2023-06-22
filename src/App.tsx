import React, { Component } from 'react';
import './App.scss';
import DropZone, { DropZoneItem } from './components/DropZone';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

interface AppState {
  dropZone2State: DropZoneItem[];
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dropZone2State: [],
    };
  }

  saveDropZone2Content = () => {
    console.log(this.state.dropZone2State);
  };

  render() {
    return (
      <div className="App">
        <Grid container spacing={2}>
          <Grid item md={6}>
            <DropZone title="Drop Zone 1" />
          </Grid>
          <Grid item md={6}>
            <DropZone title="Drop Zone 2" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={12}>
            <Button variant="outlined" onClick={this.saveDropZone2Content}>
              Save
            </Button>
          </Grid>
          <Grid item md={12}>
            {/* Drop Zone 2 Data Table */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
