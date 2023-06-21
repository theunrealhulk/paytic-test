import React, { ReactNode } from 'react';
import { Typography } from '@mui/material';
import './DropZone.scss'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
type DropZoneProps = {
  title?: string;

};

const DropZone = ({ title }: DropZoneProps) => {
    const labelWithSuffix = (label: string) => {
        if (title) {
          return `${label} - ${title}`;
        }
        return label;
      };
  return (
    <div className="drop-zone">
      {title && <Typography variant="h5">{title}</Typography>}
      <Grid>
              <Grid item md={12}>
              <FormControlLabel control={<Checkbox defaultChecked />} label={labelWithSuffix('checkbox')} />
              </Grid>
              <Grid item md={12}>
                <Switch aria-label='switch zone 1' />
              </Grid>
              <Grid item md={12}>
                <TextField id="filled-basic" label={labelWithSuffix('Text Field')} variant="filled" />
              </Grid>
            </Grid>   
    </div>
  );
};

export default DropZone;