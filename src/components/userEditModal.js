import React, { useState, useEffect } from 'react';
import { UserEditModalComponent, UserEditFormComponent } from './styles/userEditModal.style';
import { Spinner } from './styles/spinner.style';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import handleResponse from '../helpers/handle-response';
import * as Yup from 'yup';
import { FormComponent } from './styles/form.style';
import userService from '../services/user.service';
import { countryList } from '../helpers/countriesConst';

const requiredWarrning = 'To pole jest wymagane';

const checkProperty = (property, type) => {
  if (typeof property == type) return property;
  else return '';
};
const succeddStyle = { color: 'green' };

const UserEditModal = ({ closeModal, user, roles, reloadUsers, reload }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(requiredWarrning).default(checkProperty(user.name, 'string')),
    surname: Yup.string().required(requiredWarrning).default(checkProperty(user.surname, 'string')),
    phoneNumber: Yup.string().required(requiredWarrning).matches(/[0-9]/, 'Numer musi sładać się tylko z cyfr').default(checkProperty(user.phoneNumber, 'string')),
    country: Yup.string().ensure().required(requiredWarrning).default(checkProperty(user.country, 'string')),
    city: Yup.string().required(requiredWarrning).default(checkProperty(user.city, 'string')),
    address: Yup.string().required(requiredWarrning).default(checkProperty(user.address, 'string')),
    gender: Yup.string().ensure().required(requiredWarrning).default(checkProperty(user.gender, 'number')),
    isConfirmed: Yup.string().ensure().required(requiredWarrning).default(checkProperty(user.isConfirmed, 'boolean')),
  });
  const formOptions = { defaultValues: validationSchema.cast(), resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const [errorMessage, setErrorMessage] = useState('');
  const [succeed, setSucceed] = useState(false);
  const [rolesToAdd, setRolesToAdd] = useState();
  const [userRoles, setUserRoles] = useState();
  const [addRoleInput, setAddRoleInput] = useState('');
  const [deleteRoleInput, setDeleteRoleInput] = useState('');

  useEffect(() => {
    loadUserRoles();
  }, []);

  useEffect(() => {
    loadRolesToAdd();
  }, [userRoles]);

  const onSubmit = (data) => {
    const updateData = { userId: String(user.id), ...data, isConfirmed: data.isConfirmed === 'true' ? true : false, gender: data.gender * 1 };
    userService.updateUser(updateData).then((response) => reloadUsers(!reload));
  };

  const handleClose = (e) => {
    if (e.target.className.includes('background')) closeModal();
  };

  const loadRolesToAdd = () => {
    const rolesToAdd = [...roles];
    userRoles?.map((role) => (rolesToAdd.indexOf(role) !== -1 ? rolesToAdd.splice(rolesToAdd.indexOf(role), 1) : null));
    setRolesToAdd(rolesToAdd);
  };

  const loadUserRoles = () => {
    userService.getUserRoles(user.id).then((response) => {
      setUserRoles(response.value);
    });
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    const data = { userId: String(user.id), roleName: addRoleInput };
    userService.addRoleToUser(data).then((response) => {
      loadUserRoles();
      reloadUsers(!reload);
    });
  };

  const handleDeleteRole = (e) => {
    e.preventDefault();
    const data = { userId: String(user.id), roleName: deleteRoleInput === '' ? [] : deleteRoleInput };
    userService.deleteRoleFromUser(data).then((response) => {
      loadUserRoles();
      reloadUsers(!reload);
    });
  };

  const handleAddRoleInputChange = (e) => {
    setAddRoleInput(e.target.value);
  };

  const handleDeleteRoleInputChange = (e) => {
    setDeleteRoleInput(e.target.value);
  };

  return (
    <UserEditModalComponent onClick={handleClose} className='background'>
      <div className='modal'>
        <div className='close-btn-container'>
          <button onClick={closeModal}>X</button>
        </div>
        <UserEditFormComponent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='modal-header'>
            <h3>Edytuj użytkownika</h3>

            </div>
            <div className='form-group'>
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
                  <div className='data-container'>
                    <span>{user?.dateOfBirth.slice(0, 10)}</span>
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Email
                  <div className='data-container'>
                    <span>{user.userName}</span>
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Email zweryfikowany
                  <select name='isConfirmed' {...register('isConfirmed')}>
                    <option value={true}>tak</option>
                    <option value={false}>nie</option>
                  </select>
                  <span>{errors.isConfirmed?.message}</span>
                </label>
              </div>
            </div>
            <div className='form-group'>
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
            </div>
            <div className='btn-container'>
              <button type='submit' onClick={handleSubmit(onSubmit)}>
                Zapisz zmiany
              </button>
              <div className='error-box'>{errorMessage ? <span style={succeed ? succeddStyle : null}>{errorMessage}</span> : ''}</div>
            </div>
          </form>
          <div className='role-form'>
            <form>
              <div className='role-list'>
                <p>
                  Role użytkownika:&nbsp;
                  {userRoles ? userRoles.map((role) => <strong key={role}>{role}&nbsp;</strong>) : null}
                </p>
              </div>
              <div>
                <label>
                  Dodaj rolę
                  <select onChange={handleAddRoleInputChange} value={addRoleInput}>
                    <option value={''}> </option>
                    {rolesToAdd
                      ? rolesToAdd.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))
                      : null}
                  </select>
                </label>
                <button onClick={handleAddRole}>dodaj</button>
              </div>
              <div>
                <label>
                  Usuń rolę
                  <select onChange={handleDeleteRoleInputChange} value={deleteRoleInput}>
                    <option value={''}> </option>
                    {userRoles
                      ? userRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))
                      : null}
                  </select>
                </label>
                <button onClick={handleDeleteRole}>usuń</button>
              </div>
            </form>
          </div>
        </UserEditFormComponent>
      </div>
    </UserEditModalComponent>
  );
};

export default UserEditModal;
