import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { 
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Checkbox,
} from '@material-ui/core';
import { RootState, IUser } from '../../logic/state';
import { useSelector, useDispatch } from 'react-redux';
import TableBar from './components/TableBar';
import TableHeader from './components/TableHeader';
import { getAllUsers, deleteUsers } from '../../logic/actions';

function descendingComparator(a: IUser, b: IUser, orderBy: keyof IUser): number {
  if ((Number(a[orderBy]) && Number(b[orderBy])) || b[orderBy] === 0 || a[orderBy] === 0) {
    return Number(b[orderBy]) - Number(a[orderBy])
  }
  if (!Number(a[orderBy]) && !Number(b[orderBy])) {
    if (String(b[orderBy]).toLowerCase() < String(a[orderBy]).toLowerCase()) {
      return -1;
    }
    if (String(b[orderBy]).toLowerCase() > String(a[orderBy]).toLowerCase()) {
      return 1;
    }
  }
  return 0;
}

export enum Order {asc = 'asc', desc = 'desc'}
export enum Gender {male = 'false', female = 'true', all = 'all'}
export enum Country {ua = "380", us = "1", ru = "7", nl = "31", pl = "48", de = "49", all = 'all'}

export type Filter = {
  gender: Gender,
  mobile: Country,
}

function getComparator(
  order: Order,
  orderBy: keyof IUser,
): (a: IUser, b: IUser) => number {
  return order === Order.desc
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: IUser[], comparator: (a: IUser, b: IUser) => number, filter: Filter) {
  const stabilizedThis = array.map((el, index) => [el, index] as [IUser, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    } else {
      return a[1] - b[1];
    }
  });
  let sortedItems = stabilizedThis.map((el) => el[0]);
  if (filter.gender !== Gender.all) {
    sortedItems = sortedItems.filter(item => String(item.gender) === filter.gender)
  }
  if (filter.mobile !== Country.all) {
    sortedItems = sortedItems.filter(item => item.phone.startsWith(filter.mobile))
  }
  return sortedItems
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 2,
    },
    table: {
      width: '100%',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

const TableSection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [order, setOrder] = useState<Order>(Order.asc);
  const [orderBy, setOrderBy] = useState<keyof IUser>('lastName');
  const [filter, setFilter] = useState<Filter>({
    gender: Gender.all,
    mobile: Country.all
  });
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const users: IUser[] = useSelector((state: RootState) => state.users);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string | undefined; value: unknown;}>) => {
    setFilter({...filter, [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value});
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IUser) => {
    const isAsc = orderBy === property && order === Order.asc;
    setOrder(isAsc ? Order.desc : Order.asc);
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, key: string) => {
    const selectedIndex = selected.indexOf(key);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, key);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteSelected = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteUsers(selected));
    setSelected([]);
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers.length - page * rowsPerPage);

  useEffect(() => {
    dispatch(getAllUsers());
  },[dispatch]);

  useEffect(()=>{
    const items = stableSort(users, getComparator(order, orderBy), filter);
    setFilteredUsers(items);
  }, [filter, users, order, orderBy])

  return (
    <div className={classes.root}>
      <TableBar
        numSelected={selected.length}
        handleFilterChange={handleFilterChange}
        filter={filter}
        deleteSelected={deleteSelected}
      />
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size='medium'
          aria-label="table"
        >
          <TableHeader
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={filteredUsers.length}
          />
          <TableBody>
            { filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.firstName}
                    </TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>
                      {String(row.gender) === Gender.female ? 'female' : 'male'}
                    </TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.age}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableSection;