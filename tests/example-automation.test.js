
const env = require('../env.json');

const exampleAutomation = require('../automations/integrateHashTrackGoogleCalendar');

describe('Automation test', () => {
  it('should return status SUCCESS', async () => {
    const result = await exampleAutomation.run(env);

    expect(result).toEqual({ status: 'SUCCESS' });
  });
});
