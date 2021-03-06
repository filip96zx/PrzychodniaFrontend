import authenticationService from '../services/authentication.service';


const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        authenticationService.logout();
        window.location.reload();
      }
      const error = (data && data.errorMessage) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

export default handleResponse;
