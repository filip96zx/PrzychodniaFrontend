import config from '../config';
import handleResponse from '../helpers/handle-response';
import authHeader from '../helpers/auth-header';

const getUserListPaginated = (pageIndex, pageSize) => {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiURL}/users?pageIndex=${pageIndex}&pageSize=${pageSize}`, requestOptions).then(handleResponse);
};

const getUserListPaginatedFiltered = (pageIndex, pageSize, searchString) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search: searchString }),
  };
  return fetch(`${config.apiURL}/users/filter?pageIndex=${pageIndex}&pageSize=${pageSize}`, requestOptions).then(handleResponse);
};

const getUserById = (userId) => {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiURL}/users/${userId}`, requestOptions).then(handleResponse);
};

const register = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/users/register`, requestOptions)
    .then((response) => response.text())
    .then((text) => (text ? JSON.parse(text) : ''));
};

const forgotPassword = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/users/forgotpassword`, requestOptions)
    .then((response) => response.text())
    .then((text) => (text ? JSON.parse(text) : ''));
};

const resetPassword = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/users/resetpassword`, requestOptions)
    .then((response) => response.text())
    .then((text) => (text ? JSON.parse(text) : ''));
};

const getRoles = () => {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiURL}/admin/getroles`, requestOptions).then(handleResponse);
};

const getUserRoles = (userId) => {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiURL}/admin/userroles/${userId}`, requestOptions).then(handleResponse);
};

const addRoleToUser = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/admin/addrole`, requestOptions)
    .then((response) => response.text())
    .then((text) => (text ? JSON.parse(text) : ''));
};

const deleteRoleFromUser = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/admin/removerole`, requestOptions)
    .then((response) => response.text())
    .then((text) => (text ? JSON.parse(text) : ''));
};

const updateUser = (data) => {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/users/updateuser`, requestOptions)
    .then((response) => response.text())
    .then((text) => (text ? JSON.parse(text) : ''));
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
};
