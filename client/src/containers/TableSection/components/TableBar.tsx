import React from 'react';
import { makeStyles, lighten, Theme, createStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Filter, Gender, Country } from '../index';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1)
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
  },
  sortContainer: {
    display: 'flex',
    flex: '1 1 80%'
  },
  group: {
    flexDirection: 'row'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

interface Props {
  numSelected: number,
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string | undefined; value: unknown;}>) => void;
  filter: Filter,
  deleteSelected: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TableBar: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { numSelected, handleFilterChange, filter, deleteSelected } = props;
  return (
    <Toolbar className={`${classes.root} ${numSelected > 0 && classes.highlight}`}>
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="h3">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h5" id="tableTitle" component="h3">
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton component="button" aria-label="delete" onClick={deleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div title="Filter list" className={classes.sortContainer}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" id="gender-title">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender" value={filter.gender} onChange={handleFilterChange} className={classes.group}>
              <FormControlLabel value={Gender.female} control={<Radio />} label="Female" />
              <FormControlLabel value={Gender.male} control={<Radio />} label="Male" />
              <FormControlLabel value={Gender.all} control={<Radio />} label="All" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <InputLabel>Country</InputLabel>
            <Select
              labelId="select-readonly-label"
              id="select-readonly"
              value={filter.mobile}
              inputProps={{
                name: 'mobile'
              }}
              onChange={handleFilterChange}
            >
              <MenuItem value={Country.all}>All</MenuItem>
              <MenuItem value={Country.ua}>Ukraine</MenuItem>
              <MenuItem value={Country.us}>USA</MenuItem>
              <MenuItem value={Country.ru}>Russia</MenuItem>
              <MenuItem value={Country.pl}>Poland</MenuItem>
              <MenuItem value={Country.nl}>The Netherlands</MenuItem>
              <MenuItem value={Country.de}>Germany</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
    </Toolbar>
  );
};

export default TableBar;
