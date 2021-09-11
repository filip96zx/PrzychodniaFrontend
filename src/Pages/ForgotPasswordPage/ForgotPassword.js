import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormComponent } from '../../components/styles/form.style';
import { Spinner } from '../../components/styles/spinner.style';
import styled from 'styled-components';
import userService from '../../services/user.service';
import { useHistory } from 'react-router';

const StyledSpinner = styled(Spinner)`
  position: absolute;
  transform: translate(-50%);
  left: 40%;
  bottom: -80%;
`;

const ForgotPassword = () => {
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Wpisz email.').email('Wpisz poprawnie email.'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [succedd, setSucceed] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => {
    setIsLoading(true);
    setSucceed(false);
    userService
      .forgotPassword(data)
      .then(() => {
        setSucceed(true);
        setErrorMessage('Jeżeli użytkownik istnieje wysłano maila.');
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(String(err));
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      });
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const succeddStyle = { color: 'green' };

  return (
    <FormComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Przypomnij hasło</h3>
        <div>
          <label>
            Email
            <input type='text' name='userName' {...register('userName')} />
            <span>{errors.userName?.message}</span>
          </label>
        </div>
        <div className='btn-container'>
          <button type='submit' onClick={handleSubmit(onSubmit)}>
            wyslij
          </button>
          <button type='button' onClick={handleGoBack}>Powrót</button>
          {isLoading && <StyledSpinner color='gray' backgroundColor='white'></StyledSpinner>}
        </div>
        <div className='error-box'>{errorMessage ? <span style={succedd ? succeddStyle : null}>{errorMessage}</span> : ''}</div>
      </form>
    </FormComponent>
  );
};

export default ForgotPassword;
