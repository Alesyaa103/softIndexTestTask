import React from 'react';
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel } from '@material-ui/core';
import { IUser } from '../../../logic/state';
import { Order } from '..';

interface Props {
  numSelected: number,
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IUser) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof IUser;
  rowCount: number;
}

interface HeadCell {
  id: keyof IUser;
  label: string;
  sort: boolean
}

const headCells: HeadCell[] = [
  { id: 'firstName',  label: 'First name', sort: true },
  { id: 'lastName', label: 'Last Name', sort: true },
  { id: 'gender',  label: 'Gender', sort: false },
  { id: 'phone',  label: 'Phone Number', sort: false },
  { id: 'age',  label: 'Age', sort: true },
];

const TableHeader = (props: Props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property: keyof IUser) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sort ? (
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : Order.asc}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
            ) : (<span>{headCell.label}</span>)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader
