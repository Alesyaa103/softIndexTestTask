import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import CustomValidator from '../../helpers/validation';
import PhoneInput from "react-phone-input-2";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {IUser} from '../../logic/state';
import { createUser } from '../../logic/actions';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Container,
  Typography,
  CssBaseline,
  Button,
  Grid
} from "@material-ui/core";
import "react-phone-input-2/lib/material.css";

const useStyles = makeStyles((theme: Theme) => createStyles({
  aside: {
    flex: 1
  },
  submit: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  group: {
    flexDirection: 'row'
  },
  phoneInput: {
    backgroundColor: '#fafafa'
  }
}));

const FormSection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialState: Partial<IUser> = {
    firstName: '',
    lastName: '',
    gender: false,
    age: 0,
    phone: ''
  }
  const [user, setUser] = useState<Partial<IUser>>(initialState);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    phone: ''
  })

  const [userValidation, setUserValidation] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    age: true
  })

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const checkInput = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const customValidator = new CustomValidator((event.target as HTMLInputElement).value);
    const error = customValidator.checkMinLength().checkMaxLength().checkCharacters().validate();
    if (error) {
      setErrors({ ...errors, [(event.target as HTMLInputElement).name]: error });
    } else {
      setUserValidation({...userValidation, [(event.target as HTMLInputElement).name]: true});
      setErrors({...errors, [(event.target as HTMLInputElement).name]: ''})
    }
  }

  const checkPhoneNumber = (value: string) => {
    const customValidator = new CustomValidator(value);
    const error = customValidator.checkPhone().validate();
    if (error) {
      setErrors({...errors, phone: error});
      setUserValidation({...userValidation, phone: false})
    } else {
      setUserValidation({...userValidation, phone: true})
      setErrors({...errors, phone: ''})
    }
  }

  const checkAge = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const customValidator = new CustomValidator((event.target as HTMLInputElement).value);
    const error = customValidator.checkAge().validate();
    if (error) {
      setErrors({...errors, age: error});
      setUserValidation({...userValidation, age: false})
    } else {
      setUserValidation({...userValidation, age: true})
      setErrors({...errors, age: ''})
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
			...user,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    });
    if (Boolean(errors.age) && (event.target as HTMLInputElement).name === 'age') {
      checkAge(event);
    }
    const checkTextField = (Boolean(errors.firstName) && (event.target as HTMLInputElement).name === 'firstName') || (Boolean(errors.lastName) && (event.target as HTMLInputElement).name === 'lastName')
    if (checkTextField) {
      checkInput(event);
    }
  }
  
  const handlePhoneInput = (value: string) => {
    setUser({...user, phone: value});
    if (Boolean(errors.phone)) {
      checkPhoneNumber(value);
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser(user));
    setUser({...user, ...initialState, phone: "+380"});
  }

  useEffect(()=> {
    setIsSubmit(Object.values(userValidation).every((item) => item))
  }, [userValidation])

  return (
    <Container component="aside" className={classes.aside}>
      <CssBaseline />
      <Typography component="h3" variant="h5">
        Add new user
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            fullWidth
            label="First name"
            autoComplete="given-name"
            variant="outlined"
            value={user.firstName}
            onChange={handleChange}
            onBlur={checkInput}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            autoComplete="family-name"
            variant="outlined"
            fullWidth
            value={user.lastName}
            onChange={handleChange}
            onBlur={checkInput}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <PhoneInput
            onlyCountries={["ua", "us", "ru", "nl", "pl", "de"]}
            country={"ua"}
            value={user.phone as string}
            onChange={handlePhoneInput}
            onBlur={(e) => checkPhoneNumber(user.phone as string)}
            inputProps={{ name: 'phone', required: true }}
            isValid={!Boolean(errors.phone)}
          />
          <span className="error">{errors.phone}</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={user.gender}
              onChange={handleChange}
              className={classes.group}
            >
              <FormControlLabel value="true" control={<Radio />} label="Female" />
              <FormControlLabel value="false" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            id="age"
            name="age"
            label="Age"
            autoComplete="age"
            variant="outlined"
            fullWidth
            inputProps={{ min: '0', max: '100' }}
            value={user.age}
            onChange={handleChange}
            onBlur={checkAge}
            error={Boolean(errors.age)}
            helperText={errors.age}
          />
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={!isSubmit}>
          Sign Up
        </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default FormSection;
