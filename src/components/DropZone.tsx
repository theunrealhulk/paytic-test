import React, { Component } from 'react';
import { Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { v4 as uuid } from 'uuid';
import './DropZone.scss';

type DropZoneProps = {
  title?: string;
  onStateChange?: (newState: DropZoneItem[]) => void; // New prop for state change callback
};

type DropZoneItem = {
  id: string;
  position: string;
  content: React.ReactNode;
};

class DropZone extends Component<DropZoneProps> {
  state = {
    data: [
      {
        id: uuid(),
        position: '1',
        content: <FormControlLabel control={<Checkbox defaultChecked />} label={this.labelWithSuffix('checkbox 1')} />,
      },
      {
        id: uuid(),
        position: '2',
        content: <TextField id="filled-basic" label={this.labelWithSuffix('Text Field 1')} variant="filled" />,
      },
      {
        id: uuid(),
        position: '3',
        content: <FormControlLabel control={<Checkbox defaultChecked />} label={this.labelWithSuffix('checkbox 2')} />,
      },
      {
        id: uuid(),
        position: '4',
        content: <TextField id="filled-basic" label={this.labelWithSuffix('Text Field 2')} variant="filled" />,
      },
    ],
  };

  labelWithSuffix(label: string) {
    const { title } = this.props;
    if (title) {
      return `${label} - ${title}`;
    }
    return label;
  }

  render() {
    const { title } = this.props;
    const { data } = this.state;

    return (
      <div className="drop-zone">
        {title && <Typography variant="h5">{title}</Typography>}
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.content}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DropZone;
export type { DropZoneItem };
