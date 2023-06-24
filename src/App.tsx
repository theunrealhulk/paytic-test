import './App.scss';
import React, { Component, ChangeEvent } from 'react';
import { Button, Grid, Typography, Checkbox, TextField } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import { DropZoneItem } from './components/types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import DataTable from './components/DataTable';

interface AppState {
  dropZone1Items: DropZoneItem[];
  dropZone2Items: DropZoneItem[];
  showTable: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dropZone1Items: [
        {
          id: uuid(),
          position: '1',
          value: true,
          type: 'checkBox',
        },
        {
          id: uuid(),
          position: '2',
          value: '',
          type: 'text'
        },
        {
          id: uuid(),
          position: '3',
          value: '',
          type: 'text'
        },
      ],
      dropZone2Items: [
        {
          id: uuid(),
          position: '1',
          value: true,
          type: 'checkBox',
        },
        {
          id: uuid(),
          position: '2',
          value: '',
          type: 'text'
        },
      ],
      showTable: true,
    };
  }

  saveDropZone2Content = () => {
    this.setState({ showTable: true });
  };

  handleDropZone1StateChange = (newState: DropZoneItem[]) => {
    this.setState({ dropZone1Items: newState });
  };

  handleDropZone2StateChange = (newState: DropZoneItem[]) => {
    this.setState({ dropZone2Items: newState });
  };

  handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId === 'drop-zone-1' && this.state.dropZone1Items.length === 1) {
      // Return true to cancel the dragging action if there is only one item in DropZone 1
      return 
    }

    if (result.source.droppableId === 'drop-zone-2' && this.state.dropZone2Items.length === 1) {
      // Return true to cancel the dragging action if there is only one item in DropZone 2
      return 
    }
  
    const { source, destination } = result;
    const { dropZone1Items, dropZone2Items } = this.state;
  
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'drop-zone-1') {
        // Reorder items within dropZone1
        const updatedItems = Array.from(dropZone1Items);
        const [movedItem] = updatedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, movedItem);
  
        this.setState({ dropZone1Items: updatedItems });
      } else if (source.droppableId === 'drop-zone-2') {
        // Reorder items within dropZone2
        const updatedItems = Array.from(dropZone2Items);
        const [movedItem] = updatedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, movedItem);
  
        this.setState({ dropZone2Items: updatedItems });
      }
    } else {
      if (source.droppableId === 'drop-zone-1') {
        // Move item from dropZone1 to dropZone2
        const updatedSourceItems = Array.from(dropZone1Items);
        const updatedDestinationItems = Array.from(dropZone2Items);
  
        const [movedItem] = updatedSourceItems.splice(source.index, 1);
        updatedDestinationItems.splice(destination.index, 0, movedItem);
  
        this.setState({
          dropZone1Items: updatedSourceItems,
          dropZone2Items: updatedDestinationItems,
        });
      } else if (source.droppableId === 'drop-zone-2') {
        // Move item from dropZone2 to dropZone1
        const updatedSourceItems = Array.from(dropZone2Items);
        const updatedDestinationItems = Array.from(dropZone1Items);
  
        const [movedItem] = updatedSourceItems.splice(source.index, 1);
        updatedDestinationItems.splice(destination.index, 0, movedItem);
  
        this.setState({
          dropZone1Items: updatedDestinationItems,
          dropZone2Items: updatedSourceItems,
        });
      }
    }
  };
  

  handleCheckboxChange = (itemId: string, dropZone: 'dropZone1' | 'dropZone2') => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    const updatedData = dropZone === 'dropZone1' ? this.state.dropZone1Items : this.state.dropZone2Items;
    const updatedItems = updatedData.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          value: checked,
        };
      }
      return item;
    });
    if (dropZone === 'dropZone1') {
      this.setState({ dropZone1Items: updatedItems });
    } else {
      this.setState({ dropZone2Items: updatedItems });
    }
  };

  handleTextFieldChange = (itemId: string, dropZone: 'dropZone1' | 'dropZone2') => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedData = dropZone === 'dropZone1' ? this.state.dropZone1Items : this.state.dropZone2Items;
    const updatedItems = updatedData.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          value,
        };
      }
      return item;
    });
    if (dropZone === 'dropZone1') {
      this.setState({ dropZone1Items: updatedItems });
    } else {
      this.setState({ dropZone2Items: updatedItems });
    }
  };
  handleShowTable = () => {
    this.setState({ showTable: true });
  };
  
render() {
  const { dropZone1Items, dropZone2Items, showTable } = this.state;

  return (
    <div className="app">
      <DragDropContext onDragEnd={this.handleDragEnd} >
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Droppable droppableId="drop-zone-1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="drop-zone">
                    <Typography variant="h5">Drop Zone 1</Typography>

                    <Droppable droppableId="drop-zone-1">
                      {(provided) => (
                        <ul className="drop-zone-list" {...provided.droppableProps} ref={provided.innerRef}>
                          {dropZone1Items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <li
                                  className="drop-zone-item"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <span {...provided.dragHandleProps}>:::</span>
                                  {item.type === 'checkBox' ? (
                                    <div>
                                      <Checkbox
                                        id={`checkbox-${item.id}`}
                                        checked={item.value}
                                        onChange={this.handleCheckboxChange(item.id, 'dropZone1')}
                                      />
                                      <label htmlFor={`checkbox-${item.id}`}>Drop Zone 1 Checkbox 1</label>
                                    </div>
                                  ) : (
                                    <TextField
                                      id={`text-field-${item.id}`}
                                      label="Drop Zone 1 Text Field"
                                      variant="outlined"
                                      value={item.value}
                                      onChange={this.handleTextFieldChange(item.id, 'dropZone1')}
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
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
          <Grid item md={6}>
            <Droppable droppableId="drop-zone-2">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="drop-zone">
                    <Typography variant="h5">Drop Zone 2</Typography>
                    <Droppable droppableId="drop-zone-2">
                      {(provided) => (
                        <ul className="drop-zone-list" {...provided.droppableProps} ref={provided.innerRef}>
                          {dropZone2Items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <li
                                  className="drop-zone-item"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <span {...provided.dragHandleProps}>:::</span>
                                  {item.type === 'checkBox' ? (
                                    <div>
                                      <Checkbox
                                        id={`checkbox-${item.id}`}
                                        checked={item.value}
                                        onChange={this.handleCheckboxChange(item.id, 'dropZone2')}
                                      />
                                      <label htmlFor={`checkbox-${item.id}`}>Drop Zone 2 Checkbox 1</label>
                                    </div>
                                  ) : (
                                    <TextField
                                      id={`text-field-${item.id}`}
                                      label="Drop Zone 2 Text Field"
                                      variant="outlined"
                                      value={item.value}
                                      onChange={this.handleTextFieldChange(item.id, 'dropZone2')}
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
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
        </Grid>
      </DragDropContext>

      {showTable && <DataTable dropZoneItems={dropZone2Items} />}
    </div>
    );
  }
}

export default App;
