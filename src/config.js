const config = {
  apiURL: () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return 'https://localhost:5001/api';
    } else {
      return 'https://clinic-registration-app.herokuapp.com/api';
    }
  },
  //apiURL: 'https://localhost:5001/api',
  //apiURL:'https://clinic-registration-app.herokuapp.com/api',
  //apiURL: 'http://vps-63e72677.vps.ovh.net:8080/api',
};

export default config;
