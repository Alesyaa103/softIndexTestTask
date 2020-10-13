import React from 'react';
import { makeStyles, lighten } from '@material-ui/core/styles';
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TableSort from './TableSort';
import { Filter } from '../index';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 20%',
  }
}));

interface Props {
  numSelected: number,
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string | undefined; value: unknown;}>) => void;
  filter: Filter
}

const TableBar = (props: Props) => {
  const classes = useStyles();
  const { numSelected, handleFilterChange, filter } = props;
  return (
    <Toolbar className={`${classes.root} ${numSelected > 0 && classes.highlight}`}>
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <TableSort handleFilterChange={handleFilterChange} filter={filter}/>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default TableBar;
