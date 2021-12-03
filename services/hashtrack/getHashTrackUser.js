const request = require('@linkapi.solutions/nodejs-sdk/request');

module.exports = async ({ username, token }) => {
  try {
    const options = {
      method: 'GET',
      url: 'http://api.hashtrack.io/v1/users',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      queryString: {
        username,
        users: true
      }
    };

    const { response } = await request(options);

    return response.body[0];
  } catch (error) {
    throw new Error(error);
  }
};
