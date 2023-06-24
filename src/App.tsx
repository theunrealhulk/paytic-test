import './App.scss';
import React, { Component } from 'react';
import DropZone from './components/DropZone';
import DataTable from './components/DataTable';
import { Button, Grid } from '@mui/material';

interface AppState {
  dropZone2State: DropZoneItem[];
  showTable: boolean;
}

type DropZoneItem = {
  id: string;
  position: string;
  checked?: boolean;
  value?: string;
};



class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dropZone2State: [],
      showTable: false,
    };
  }

  saveDropZone2Content = () => {
    this.setState({ showTable: true });
  };

  handleDropZone2StateChange = (newState: DropZoneItem[]) => {
    this.setState({ dropZone2State: newState });
  };
  render() {
    const { dropZone2State, showTable } = this.state;

    return (
      <div className="app">
        <Grid container spacing={2}>
          <Grid item md={6}>
            <DropZone title="Drop Zone 1" />
          </Grid>
          <Grid item md={6}>
            <DropZone title="Drop Zone 2" onStateChange={this.handleDropZone2StateChange} />
          </Grid>
          <Grid container>
          <Grid item md={12}>
            <Button variant="outlined" onClick={this.saveDropZone2Content}>
              Save
            </Button>
          </Grid>
          <Grid item md={12}>
            {/* Render the table only if showTable is true */}
            {showTable && <DataTable dropZoneItems={dropZone2State} />}
          </Grid>
        </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;