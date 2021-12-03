// chore
const logger = require('@linkapi.solutions/nodejs-sdk/logger');

// data-transformations
const dtHashtrackAppointment = require('../data-transformations/dtHashTrackAppointment');
const dtReduceHashTrackProjectsPaylod = require('../data-transformations/dtReduceHashTrackProjectsPaylod');

// services
const getGoogleEvents = require('../services/google/getGoogleEvents');
const getHashTrackUser = require('../services/hashtrack/getHashTrackUser');
const generateGoogleToken = require('../services/google/generateGoogleToken');
const getHashTrackProjects = require('../services/hashtrack/getHashTrackProjects');
const generateHashtrackToken = require('../services/hashtrack/generateHashtrackToken');
const insertHashTrackAppointment = require('../services/hashtrack/insertHashTrackAppointment');

// functions
const findHashTrackTask = require('../functions/findHashTrackTask');
const findHashTrackProject = require('../functions/findHashTrackProject');

class Automation {
  async run(ctx) {
    logger.log({
      data: {
        message: 'start automation'
      },
      name: 'START AUTOMATION',
      uniqueKey: 'automation',
      status: 'SUCCESS',
      finalLog: false
    });

    try {
      logger.log({
        data: ctx,
        name: 'CTX',
        uniqueKey: 'automation',
        status: 'SUCCESS',
        finalLog: false
      });

      const googleAccessToken = await generateGoogleToken(ctx.googleCredentials);
      logger.log({
        data: googleAccessToken,
        name: 'USER GOOGLE TOKEN',
        uniqueKey: 'automation',
        status: 'SUCCESS',
        finalLog: false
      });
      const hashTrackAccessToken = await generateHashtrackToken(ctx.hashTrackCredentials);
      logger.log({
        data: hashTrackAccessToken,
        name: 'USER HASHTRACK TOKEN',
        uniqueKey: 'automation',
        status: 'SUCCESS',
        finalLog: false
      });

      const googleEvents = await getGoogleEvents({
        user_email: ctx.googleCredentials.user_email,
        accessToken: googleAccessToken
      });
      logger.log({
        data: googleEvents,
        name: 'USER GOOGLE EVENTS',
        uniqueKey: 'automation',
        status: 'SUCCESS',
        finalLog: false
      });

      for (const googleEvent of googleEvents) {
        const uniqueKey = `ID(${googleEvent.id})-Summary(${googleEvent.summary})`;

        try {
          logger.log({
            data: googleEvent,
            name: 'GOOGLE EVENT',
            uniqueKey,
            status: 'SUCCESS',
            finalLog: false
          });

          const hashTrackUser = await getHashTrackUser({
            username: ctx.hashTrackCredentials.username,
            token: hashTrackAccessToken
          });
          logger.log({
            data: hashTrackUser,
            name: 'HASHTRACK USER',
            uniqueKey,
            status: 'SUCCESS',
            finalLog: false
          });

          const hashTrackProjects = await getHashTrackProjects({
            token: hashTrackAccessToken
          });
          logger.log({
            data: {
              length: hashTrackProjects.length,
              hashTrackProjects: dtReduceHashTrackProjectsPaylod({ hashTrackProjects })
            },
            name: 'HASHTRACK PROJECTS',
            uniqueKey,
            status: 'SUCCESS',
            finalLog: false
          });

          const hashTrackProject = findHashTrackProject({
            hashTrackProjects,
            googleEvent
          });
          logger.log({
            data: hashTrackProject,
            name: 'HASHTRACK PROJECT',
            uniqueKey,
            status: 'SUCCESS',
            finalLog: false
          });

          const hashTrackTask = findHashTrackTask({
            hashTrackProject,
            googleEvent
          });
          logger.log({
            data: hashTrackTask,
            name: 'HASHTRACK TASK',
            uniqueKey,
            status: 'SUCCESS',
            finalLog: false
          });

          const hashtrackAppointment = dtHashtrackAppointment({
            hashTrackUser,
            hashTrackProject,
            googleEvent,
            hashTrackTask
          });
          logger.log({
            data: hashtrackAppointment,
            name: 'HASHTRACK APPOINTMENT',
            uniqueKey,
            status: 'SUCCESS',
            finalLog: false
          });

          const resultHashTrackAppointmentInsertion = await insertHashTrackAppointment({
            token: hashTrackAccessToken,
            data: hashtrackAppointment
          });
          logger.log({
            data: resultHashTrackAppointmentInsertion,
            name: 'RESULT HASHTRACK APPOINTMENT INSERTION',
            uniqueKey,
            status: 'SUCCESS',
            finalLog: true
          });
        } catch (error) {
          logger.log({
            data: {
              message: error.message || null,
              stack: error.stack || null,
              error
            },
            name: 'ERROR',
            uniqueKey,
            status: 'ERROR',
            finalLog: true
          });
        }
      }

      logger.log({
        data: {
          message: 'automation finish with success'
        },
        name: 'FINISH AUTOMATION',
        uniqueKey: 'automation',
        status: 'SUCCESS',
        finalLog: true
      });

      return { status: 'SUCCESS' };
    } catch (error) {
      logger.log({
        data: {
          message: error.message || null,
          stack: error.stack || null,
          error
        },
        name: 'ERROR',
        uniqueKey: 'automation',
        status: 'ERROR',
        finalLog: true
      });

      return {
        message: error.message || null,
        stack: error.stack || null,
        error
      };
    }
  }
}

module.exports = new Automation();
