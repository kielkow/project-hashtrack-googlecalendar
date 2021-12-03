const request = require('@linkapi.solutions/nodejs-sdk/request');

module.exports = async ({ token, data }) => {
  try {
    const options = {
      method: 'POST',
      url: 'http://api.hashtrack.io/v1/appointments',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data
    };

    const { response } = await request(options);

    return response.body;
  } catch (error) {
    throw new Error(error);
  }
};
