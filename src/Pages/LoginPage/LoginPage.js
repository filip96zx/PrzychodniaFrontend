import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import authenticationService from '../../services/authentication.service';
import { useAuth } from '../../globalStates/GlobalStates';
import { useHistory } from 'react-router';
import { FormComponent } from '../../components/styles/form.style';
import { Spinner } from '../../components/styles/spinner.style';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import config from '../../config';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: block;
  text-align: center;
  :hover {
    color: #444;
    text-decoration: underline;
  }
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 39%;
  bottom: 0;
  @media(max-width: 355px) {
    position: absolute;
    top:0;
    left:20%;

  }
  `;
const LoginPage = () => {
  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Login is required'),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const [errorMessage, setErrorMessage] = useState('');
  const [isloading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [isAuth, setLoggedIn, setLoggedOut] = useAuth();
  const history = useHistory();

  const onSubmit = (data) => {
    setIsLoading(true);
    authenticationService
      .login(data.login, data.password)
      .then(() => {
        setLoggedIn();
        setIsLoading(false);
        history.push('/');
      })
      .catch((error) => {
        setErrorMessage(String(error));
        setIsLoading(false);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      });
  };
  const handleGoToRegister = () => {
    history.push('/register');
  };

  return (
    <FormComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Email
            <input type='text' name='login' {...register('login')} />
            <span>{errors.login?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Hasło
            <input type='password' name='password' {...register('password')} />
            <span>{errors.password?.message}</span>
          </label>
        </div>
        <div className='btn-container'>
          <button type='submit' onClick={handleSubmit(onSubmit)}>
            zaloguj
          </button>
          {isloading && <StyledSpinner/>}
          <button type='button' onClick={handleGoToRegister}>
            Rejestracja
          </button>
        </div>
        <StyledLink to='/forgotpassword'>Przypomnij hasło</StyledLink>
        <div className='error-box'>{errorMessage ? <span>{errorMessage}</span> : ''}</div>
      </form>
    </FormComponent>
  );
};

export default LoginPage;
