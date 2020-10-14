import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';

interface Props {
  theme: boolean,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header:React.FC<Props> = (props: Props) => {
  const { theme, handleChange } = props;
  return (
    <div>
      <FormControlLabel
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
    </div>
  )
}

export default Header
