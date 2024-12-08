import { updateUser } from '@services/auth-slice';
import { useAppDispatch, useAppSelector } from '@services/store';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';

export const Profile: FC = () => {
  const user = useAppSelector((s) => s.auth.auth!.user);
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;
  const dispatch = useAppDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue))
      .unwrap()
      .then(() => {
        setFormValue((prevState) => ({
          ...prevState,
          password: ''
        }));
      })
      .finally(() => {});
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
