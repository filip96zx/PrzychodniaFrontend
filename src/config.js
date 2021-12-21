const config = {
  apiURL: () => {
    if (process.env.NODE_ENV === 'development') {
      return 'https://localhost:5001/api';
      //return 'https://clinic-registration-app.herokuapp.com/api';
    } else {
      return 'https://clinic-registration-app.herokuapp.com/api';
    }
  },
};

export default config;
