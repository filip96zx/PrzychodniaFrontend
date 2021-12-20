import config from '../config';
import authHeader from '../helpers/auth-header';
import handleResponse from '../helpers/handle-response';

const apiUrl = config.apiURL();

const getVisitsInWeek = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ weekDay: data.toISOString() }),
  };
  return fetch(`${apiUrl}/doctor/getvisits`, requestOptions).then(handleResponse);
};

const deleteVisit = (data) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ visitId: data }),
  };
  return fetch(`${apiUrl}/doctor/deletevisit`, requestOptions).then(handleResponse);
};

const addVisits = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/createvisit`, requestOptions).then(handleResponse);
};

const getDoctorTypes = (data) => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`${apiUrl}/doctor/gettypes`, requestOptions).then(handleResponse);
};

const getVisitDetails = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/getvisitdetails`, requestOptions).then(handleResponse);
};

const finishVisit = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/finishvisit`, requestOptions).then(handleResponse);
};

const cancelVisit = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/cancelvisit`, requestOptions).then(handleResponse);
};

const getMessages = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/getmessages`, requestOptions).then(handleResponse);
};
const sendMessage = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/sendmessage`, requestOptions).then(handleResponse);
};

const sendPrescription = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/sendprescritpion`, requestOptions).then(handleResponse);
};

const getPrescritpions = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/getprescritpions`, requestOptions).then(handleResponse);
};

const deletePrescription = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/deleteprescritpion`, requestOptions).then(handleResponse);
};
const sendFinding = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/sendfinding`, requestOptions).then(handleResponse);
};

const getFindings = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/getfindings`, requestOptions).then(handleResponse);
};
const deleteFinding = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(`${apiUrl}/doctor/deletefinding`, requestOptions).then(handleResponse);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getVisitsInWeek,
  deleteVisit,
  addVisits,
  getDoctorTypes,
  getVisitDetails,
  finishVisit,
  cancelVisit,
  getMessages,
  sendMessage,
  sendPrescription,
  getPrescritpions,
  deletePrescription,
  sendFinding,
  getFindings,
  deleteFinding
};
