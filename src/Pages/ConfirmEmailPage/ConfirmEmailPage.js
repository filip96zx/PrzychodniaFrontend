import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import userService from '../../services/user.service';
import ConfirmEmailStyled from './style/ConfirmEmailPage.style';
import { Spinner } from '../../components/styles/spinner.style';

const positiveResult = <div><span className='icon'>✓</span> <span>Email został pomyślnie zweryfikowany.</span></div>;
const negativeResult =<div><span className='icon'>⨯</span><span>Błąd.</span></div> ;

const ConfirmEmailPage = () => {
  const [isLoading, setIsLoadning] = useState(false);
  const [success, setSuccess] = useState(null);
  const params = useParams();

  useEffect(() => {
    setIsLoadning(true);
    userService.confirmEmail(params.userId, params.code).then(response => {
      setIsLoadning(false);
      setSuccess(true);
    }).catch(err => {
      setIsLoadning(false);
      setSuccess(false);
    })
  }, []);

  return <ConfirmEmailStyled>
    {!isLoading && (success ? positiveResult : negativeResult)}
    {isLoading && <Spinner className='spinner'></Spinner>}
  </ConfirmEmailStyled>;
};

export default ConfirmEmailPage;
