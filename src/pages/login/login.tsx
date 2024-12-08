import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch } from '@services/store';
import { loginUser } from '@services/auth-slice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e: SyntheticEvent) => {
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        const to = location.state.from ?? '/';
        console.log(to);
        navigate(to);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
    e.preventDefault();
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
