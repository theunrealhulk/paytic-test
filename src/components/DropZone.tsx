import React, { useState } from 'react';
import { Typography } from '@mui/material';
import './DropZone.scss';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { v4 as uuid } from 'uuid';


type DropZoneProps = {
  title?: string;
};

type DropZoneItem = {
  id: string;
  position: string;
  content: React.ReactNode;
};

const DropZone = ({ title }: DropZoneProps) => {
  const labelWithSuffix = (label: string) => {
    if (title) {
      return `${label} - ${title}`;
    }
    return label;
  };

  const [data, setData] = useState<DropZoneItem[]>([
    {
      id: uuid(),
      position: '1',
      content: <FormControlLabel control={<Checkbox defaultChecked />} label={labelWithSuffix('checkbox 1')} />,
    },
    {
      id: uuid(),
      position: '2',
      content: <TextField id="filled-basic" label={labelWithSuffix('Text Field 1')} variant="filled" />,
    },
    {
      id: uuid(),
      position: '3',
      content: <FormControlLabel control={<Checkbox defaultChecked />} label={labelWithSuffix('checkbox 2')} />,
    },
    {
      id: uuid(),
      position: '4',
      content: <TextField id="filled-basic" label={labelWithSuffix('Text Field 2')} variant="filled" />,
    },
  ]);

  return (
    <div className="drop-zone">
      <div className="drop-zone">
        {title && <Typography variant="h5">{title}</Typography>}
        <ul>
        {data.map((item) => (
            <li key={item.id}>
            {item.content}
            </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default DropZone;
