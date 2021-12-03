const qs = require('qs');
const request = require('@linkapi.solutions/nodejs-sdk/request');

module.exports = async ({ username, password }) => {
  try {
    const options = {
      method: 'POST',
      url: 'http://api.hashtrack.io/v1/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({
        client_id: 'timesheet',
        client_secret: 'timesheet@password',
        grant_type: 'password',
        password,
        username
      }),
    };

    const { response } = await request(options);

    return response.body.access_token;
  } catch (error) {
    throw new Error(error);
  }
};
