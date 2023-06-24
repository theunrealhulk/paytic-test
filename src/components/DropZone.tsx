import React, { Component, ChangeEvent } from 'react';
import { Typography, Checkbox, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import './DropZone.scss';

type DropZoneProps = {
  title?: string;
  onStateChange?: (newState: DropZoneItem[]) => void;
};

type DropZoneItem = {
  id: string;
  position: string;
  checked?: boolean;
  value?: string;
};

type DropZoneState = {
  data: DropZoneItem[];
};

class DropZone extends Component<DropZoneProps, DropZoneState> {
  constructor(props: DropZoneProps) {
    super(props);
    this.state = {
      data: [
        {
          id: uuid(),
          position: '1',
          checked: true,
        },
        {
          id: uuid(),
          position: '2',
          value: '',
        },
      ],
    };
  }

  handleCheckboxChange = (itemId: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const updatedData = this.state.data.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          checked,
        };
      }
      return item;
    });
    this.setState({ data: updatedData }, () => {
      if (this.props.onStateChange) {
        this.props.onStateChange(updatedData);
      }
    });
  };

  handleTextFieldChange = (itemId: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedData = this.state.data.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          value,
        };
      }
      return item;
    });
    this.setState({ data: updatedData }, () => {
      if (this.props.onStateChange) {
        this.props.onStateChange(updatedData);
      }
    });
  };

  handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const updatedData = Array.from(this.state.data);
    const [movedItem] = updatedData.splice(source.index, 1);
    updatedData.splice(destination.index, 0, movedItem);

    this.setState({ data: updatedData }, () => {
      if (this.props.onStateChange) {
        this.props.onStateChange(updatedData);
      }
    });
  };

  render() {
    const { title } = this.props;
    const { data } = this.state;

    return (
      <div className="drop-zone">
        <Typography variant="h5">{title}</Typography>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId="drop-zone">
            {(provided) => (
              <ul className="drop-zone-list" {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <li
                        className="drop-zone-item"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {item.position === '1' ? (
                          <FormControlLabel
                            control={
                              <Checkbox
                                id={`checkbox-${item.id}`}
                                checked={item.checked}
                                onChange={this.handleCheckboxChange(item.id)}
                              />
                            }
                            label={`${title} Checkbox 1`}
                          />
                        ) : (
                          <TextField
                            id={`text-field-${item.id}`}
                            label={`${title} Text Field`}
                            variant="outlined"
                            value={item.value}
                            onChange={this.handleTextFieldChange(item.id)}
                          />
                        )}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default DropZone;
