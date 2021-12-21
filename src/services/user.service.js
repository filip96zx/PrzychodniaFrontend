import config from '../config';
import handleResponse from '../helpers/handle-response';
import authHeader from '../helpers/auth-header';

const apiUrl = config.apiURL;

const getUserListPaginated = (pageIndex, pageSize) => {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${apiUrl}/users?pageIndex=${pageIndex}&pageSize=${pageSize}`, requestOptions).then(handleResponse);
};

const getUserListPaginatedFiltered = (pageIndex, pageSize, searchString) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ search: searchString }),
    credentials: 'include',
  };
  return fetch(`${apiUrl}/users/filter?pageIndex=${pageIndex}&pageSize=${pageSize}`, requestOptions).then(handleResponse);
};

const getUserById = (userId) => {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${apiUrl}/users/${userId}`, requestOptions).then(handleResponse);
};

const register = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/users/register`, requestOptions).then(handleResponse);
};

const forgotPassword = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/users/forgotpassword`, requestOptions).then(handleResponse);
};

const resetPassword = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/users/resetpassword`, requestOptions).then(handleResponse);
};

const getRoles = () => {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${apiUrl}/admin/getroles`, requestOptions).then(handleResponse);
};

const getUserRoles = (userId) => {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${apiUrl}/admin/userroles/${userId}`, requestOptions).then(handleResponse);
};

const addRoleToUser = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return fetch(`${apiUrl}/admin/addrole`, requestOptions).then(handleResponse);
};

const deleteRoleFromUser = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return fetch(`${apiUrl}/admin/removerole`, requestOptions).then(handleResponse);
};

const updateUser = (data) => {
  const requestOptions = {
    method: 'PATCH',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return fetch(`${apiUrl}/users/updateuser`, requestOptions).then(handleResponse);
};

const getSpecialisations = () => {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${apiUrl}/admin/getspecialisations`, requestOptions).then(handleResponse);
};

const getRemovableSpecialisations = () => {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${apiUrl}/admin/getremovablespecialisations`, requestOptions).then(handleResponse);
};

const deleteSpecialisation = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return fetch(`${apiUrl}/admin/deletespecialisation`, requestOptions).then(handleResponse);
};
const addSpecialisation = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return fetch(`${apiUrl}/admin/createspecialisation`, requestOptions).then(handleResponse);
};

const confirmEmail = (userId, code) => {
  return fetch(`${apiUrl}/users/confirmemail/${userId}/${code}`).then(handleResponse);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserListPaginated,
  getUserListPaginatedFiltered,
  getUserById,
  register,
  forgotPassword,
  resetPassword,
  getRoles,
  getUserRoles,
  addRoleToUser,
  deleteRoleFromUser,
  updateUser,
  getSpecialisations,
  getRemovableSpecialisations,
  addSpecialisation,
  deleteSpecialisation,
  confirmEmail,
};
