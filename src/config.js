const config = {
  apiURL: () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return 'https://clinic-registration-app.herokuapp.com/api';
      //return 'https://localhost:5001/api';
    } else {
      return 'https://clinic-registration-app.herokuapp.com/api';
    }
  },
};

export default config;
