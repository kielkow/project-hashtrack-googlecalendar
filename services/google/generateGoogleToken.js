const qs = require('qs');
const request = require('@linkapi.solutions/nodejs-sdk/request');

module.exports = async ({ client_id, client_secret, refresh_token }) => {
  try {
    const { response } = await request({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: qs.stringify({
        client_id,
        client_secret,
        grant_type: 'refresh_token',
        refresh_token
      })
    });

    return response.body.access_token;
  } catch (error) {
    throw new Error(error);
  }
};
