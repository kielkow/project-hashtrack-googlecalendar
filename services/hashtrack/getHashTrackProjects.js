const request = require('@linkapi.solutions/nodejs-sdk/request');

module.exports = async ({ token }) => {
  try {
    const options = {
      method: 'GET',
      url: 'http://api.hashtrack.io/v1/projects',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { response } = await request(options);

    return response.body;
  } catch (error) {
    throw new Error(error);
  }
};
