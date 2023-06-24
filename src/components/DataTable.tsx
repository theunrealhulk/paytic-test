import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './DataTable.scss'

type DataTableProps = {
  dropZoneItems: DropZoneItem[];
};

type DropZoneItem = {
  id: string;
  position: string;
  checked?: boolean;
  value?: string;
};

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
              {dropZoneItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {item.checked === true && item.value === undefined && 'True'}
                    {item.checked === false && item.value === undefined && 'False'}
                    {item.value !== undefined && item.value}
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
