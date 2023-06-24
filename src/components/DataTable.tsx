import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './DataTable.scss';
import { DropZoneItem} from './types'


interface DataTableProps {
  dropZoneItems: DropZoneItem[];
}

class DataTable extends Component<DataTableProps> {
  render() {
    const { dropZoneItems } = this.props;

    return (
      <div id='table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dropZoneItems.map((item:DropZoneItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                    <TableCell>
                      {item.value === true && item.type === 'checkBox' ? 'True' : null}
                      {item.value === false && item.type === 'checkBox' ? 'False' : null}
                      {item.type !== 'checkBox' ? item.value : null}
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default DataTable;
