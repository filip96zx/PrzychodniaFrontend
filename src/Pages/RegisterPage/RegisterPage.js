import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import handleResponse from '../../helpers/handle-response';
import styled from 'styled-components';
import { FormComponent } from '../../components/styles/form.style';
import { Spinner } from '../../components/styles/spinner.style';
import userService from '../../services/user.service';
import { countryList } from '../../helpers/countriesConst';

const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 53%;
  top: -5%;
  @media(max-width:390px){
    left: 75%;
  }
`;
const requiredWarrning = 'To pole jest wymagane';
const validationSchema = Yup.object().shape({
  name: Yup.string().required(requiredWarrning),
  surname: Yup.string().required(requiredWarrning),
  //UserName: Yup.string().required().email(),
  dateOfBirth: Yup.date().required(requiredWarrning).max(new Date(), 'Wybierz poprawną datę').typeError(requiredWarrning),
  email: Yup.string().required(requiredWarrning).email('Wpisz poprawny email'),
  phoneNumber: Yup.string().required(requiredWarrning).matches(/[0-9]/, 'Numer musi sładać się tylko z cyfr'),
  country: Yup.string().required(requiredWarrning),
  city: Yup.string().required(requiredWarrning),
  address: Yup.string().required(requiredWarrning),
  gender: Yup.string().ensure().required(requiredWarrning),
  password: Yup.string()
    .required(requiredWarrning)
    .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Hasło musi zawierać minimum 8 znaków, wielkią literę, liczbę i znak specjalny.'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Podane hasła różnią się'),
});

const RegisterPage = () => {
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const [isloading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [succeed, setSucceed] = useState(false);
  const history = useHistory();


  const onSubmit = (data) => {
    setIsLoading(true);
    setSucceed(false);
    const newUser = { ...data, dateOfBirth: data.dateOfBirth.toISOString().slice(0,10), gender: parseInt(data.gender), userName: data.email };
    userService
      .register(newUser)
      .then(response => {
        setIsLoading(false);
        setSucceed(true);
        setErrorMessage('Konto zostało utworzone.');
        setTimeout(() => {
          history.push('/');
        }, 2000);
      })
      .catch(err => {
        setIsLoading(false);
        setErrorMessage(String(err))}
      );
    if (!succeed) {
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const succeedStyle = { color: 'green' };

  return (
    <FormComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Utwórz konto</h3>
        <div>
          <label>
            Imie
            <input type='text' name='name' {...register('name')} />
            <span>{errors.name?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Nazwisko
            <input type='text' name='surname' {...register('surname')} />
            <span>{errors.surname?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Data urodzenia
            <input type='date' name='dateOfBirth' {...register('dateOfBirth')} />
            <span>{errors.dateOfBirth?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Email
            <input type='text' name='email' {...register('email')} />
            <span>{errors.email?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Numer telefonu
            <input type='text' name='phoneNumber' {...register('phoneNumber')} />
            <span>{errors.phoneNumber?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Kraj
            <select name='country' {...register('country')}>
              {countryList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <span>{errors.country?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Miasto
            <input type='text' name='city' {...register('city')} />
            <span>{errors.city?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Adres
            <input type='text' name='address' {...register('address')} />
            <span>{errors.address?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Płeć
            <select name='gender' {...register('gender')}>
              <option value=''></option>
              <option value='0'>Mężczyzna</option>
              <option value='1'>Kobieta</option>
            </select>
            <span>{errors.gender?.message}</span>
          </label>
        </div>
        <div style = {{ marginBottom:'35px' }}>
          <label>
            Hasło
            <input type='password' name='password' {...register('password')} />
            <span>{errors.password?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Potwierdź hasło
            <input type='password' name='passwordConfirmation' {...register('passwordConfirmation')} />
            <span>{errors.passwordConfirmation?.message}</span>
          </label>
        </div>
        <div className='btn-container'>
          <button type='submit' onClick={handleSubmit(onSubmit)}>
            Utwórz konto
          </button>
          {isloading && <StyledSpinner/>}
          <button type='button' onClick={handleGoBack}>
            Powrót
          </button>
          <div className='error-box'>{errorMessage ? <span style={succeed ? succeedStyle : null}>{errorMessage}</span> : ''}</div>
        </div>
      </form>
    </FormComponent>
  );
};

export default RegisterPage;
