import config from '../config';
import authHeader from '../helpers/auth-header';
import handleResponse from '../helpers/handle-response';

const apiUrl = config.apiURL();

const getDoctorsTypes = () => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`${apiUrl}/patient/getdoctors`, requestOptions).then(handleResponse);
};
const getDoctorsInType = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/patient/getdoctorsintype`, requestOptions).then(handleResponse);
};

const getDoctorVisits = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/patient/getvisits`, requestOptions).then(handleResponse);
};

const getDoctorAllVisits = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/patient/getalldoctorsvisits`, requestOptions).then(handleResponse);
};

const registerToVisit = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/patient/registertovisit`, requestOptions).then(handleResponse);
};

const cancelVisitRegistration = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/patient/cancelvisitreservation`, requestOptions).then(handleResponse);
};

const getRegisteredVisits = (pageIndex, pageSize) => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`${apiUrl}/patient/getreservedvisits?pageIndex=${pageIndex}&pageSize=${pageSize}`, requestOptions).then(handleResponse);
};

const getDoneVisits = (pageIndex, pageSize) => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`${apiUrl}/patient/getdonevisits?pageIndex=${pageIndex}&pageSize=${pageSize}`, requestOptions).then(handleResponse);
};

const getVisitDetails = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/patient/getvisitdetails`, requestOptions).then(handleResponse);
};

const getMessages = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/patient/getmessages`, requestOptions).then(handleResponse);
};
const sendMessage = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/patient/sendmessage`, requestOptions).then(handleResponse);
};
const getPrescritpions = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/patient/getprescritpions`, requestOptions).then(handleResponse);
};
const getFindings = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/patient/getfindings`, requestOptions).then(handleResponse);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getDoctorsTypes,
  getDoctorsInType,
  getDoctorVisits,
  getDoctorAllVisits,
  registerToVisit,
  getRegisteredVisits,
  getDoneVisits,
  getVisitDetails,
  cancelVisitRegistration,
  getMessages,
  sendMessage,
  getPrescritpions,
  getFindings,
};
