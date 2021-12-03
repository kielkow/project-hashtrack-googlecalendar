const request = require('@linkapi.solutions/nodejs-sdk/request');

module.exports = async ({ user_email, accessToken }) => {
  try {
    const timeMin = `${new Date().toISOString().split('T')[0]}T00:01:00Z`;
    const timeMax = `${new Date().toISOString().split('T')[0]}T23:59:59Z`;

    const { response } = await request({
      method: 'GET',
      url: `https://www.googleapis.com/calendar/v3/calendars/${user_email}/events?timeMin=${timeMin}&timeMax=${timeMax}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    });

    return response.body.items;
  } catch (error) {
    throw new Error(error);
  }
};
