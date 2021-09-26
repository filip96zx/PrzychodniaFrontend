import config from '../config';
import authHeader from '../helpers/auth-header';
import handleResponse from '../helpers/handle-response';

const getDoctorsTypes = () => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`${config.apiURL}/patient/getdoctors`, requestOptions).then(handleResponse);
};
const getDoctorsInType = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/patient/getdoctorsintype`, requestOptions).then(handleResponse);
};

const getDoctorVisits = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/patient/getvisits`, requestOptions).then(handleResponse);
};

const getDoctorAllVisits = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/patient/getalldoctorsvisits`, requestOptions).then(handleResponse);
};

const registerToVisit = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/patient/registertovisit`, requestOptions).then(handleResponse);
};

const cancelVisitRegistration = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/patient/cancelvisitreservation`, requestOptions).then(handleResponse);
};

const getRegisteredVisits = () => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`${config.apiURL}/patient/getreservedvisits`, requestOptions).then(handleResponse);
};

const getDoneVisits = () => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`${config.apiURL}/patient/getdonevisits`, requestOptions).then(handleResponse);
};

const getVisitDetails = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/patient/getvisitdetails`, requestOptions).then(handleResponse);
};

const getMessages = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/patient/getmessages`, requestOptions).then(handleResponse);
};
const sendMessage = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/patient/sendmessage`, requestOptions).then(handleResponse);
};
const getPrescritpions = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${config.apiURL}/patient/getprescritpions`, requestOptions).then(handleResponse);
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
  getPrescritpions
};
