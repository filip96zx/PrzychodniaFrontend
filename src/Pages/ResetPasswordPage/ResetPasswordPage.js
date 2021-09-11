import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormComponent } from '../../components/styles/form.style';
import { Spinner } from '../../components/styles/spinner.style';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import userService from '../../services/user.service';

const StyledSpinner = styled(Spinner)`
  position: absolute;
  transform: translate(-50%);
  left: 76%;
  top: 0%;
`;
const requiredWarrning = 'To pole jest wymagane';
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required(requiredWarrning)
    .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Hasło musi zawierać minimum 8 znaków, wielkią literę, liczbę i znak specjalny.'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Podane hasła różnią się'),
});

const ResetPasswordPage = () => {
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const params = useParams();
  const [isloading, setIsLoading] = useState(false);
  const [succedd, setSucceed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data) => {
    const resetdata = { userId: parseInt(params.userId), code: params.code, newPassword: data.password };
    setIsLoading(true);
    setSucceed(false);
    userService.resetPassword(resetdata).then((message) => {
      if (message === '') {
        setSucceed(true);
        setErrorMessage('Hasło zmienione.');
        setIsLoading(false);
      } else {
        setErrorMessage('Link jest już nieaktywny.');
        setIsLoading(false);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    });
  };

  const succeddStyle = { color: 'green' };
  return (
    <FormComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Nowe hasło
            <input type='password' name='password' {...register('password')} />
            <span>{errors.password?.message}</span>
          </label>
        </div>
        <div>
          <label>
            Powtórz hasło
            <input type='password' name='password' {...register('passwordConfirmation')} />
            <span>{errors.passwordConfirmation?.message}</span>
          </label>
        </div>
        <div className='btn-container'>
          <button type='submit' onClick={handleSubmit(onSubmit)}>
            zmień hasło
          </button>
          {isloading && <StyledSpinner color='gray' backgroundColor='white'></StyledSpinner>}
          <div className='error-box'>{errorMessage ? <span style={succedd ? succeddStyle : null}>{errorMessage}</span> : ''}</div>
        </div>
      </form>
    </FormComponent>
  );
};

export default ResetPasswordPage;
