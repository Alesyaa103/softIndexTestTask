import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { Filter, Gender, Country } from '../index';

const useStyles = makeStyles((theme) => ({
  root: {
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
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string | undefined; value: unknown;}>) => void;
  filter: Filter
}

const TableSort = (props: Props) => {
  const { filter, handleFilterChange } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Gender</FormLabel>
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
  )
}

export default TableSort
