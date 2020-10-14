import React from 'react';
import { FormControlLabel, Switch, AppBar } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  header: {
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
  }
}))

interface Props {
  theme: boolean,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header:React.FC<Props> = (props: Props) => {
  const { theme, handleChange } = props;
  const classes = useStyles();

  return (
    <AppBar position="static" color="transparent" >
      <FormControlLabel
        className={classes.header}
        control={
          <Switch
            checked={theme}
            onChange={handleChange}
            name="theme"
            color="secondary"
          />
        }
        label={theme ? 'Dark theme' : 'Light theme'}
      />
    </AppBar>
  )
}

export default Header
