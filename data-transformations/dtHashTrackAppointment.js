module.exports = ({
  hashTrackUser,
  hashTrackProject,
  googleEvent,
  hashTrackTask
}) => {
  const date = new Date();

  const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();

  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;

  const hashTrackAppointment = {
    appointment: {
      user: hashTrackUser._id,
      toDo: false,
      project: hashTrackProject._id,
      task_description: {
        id: hashTrackTask._id,
        cost: 0,
        name: hashTrackTask.name
      },
      track_option: 'start_and_end',
      source: 'manual',
      start: googleEvent.start.dateTime,
      stop: googleEvent.end.dateTime,
      customer: hashTrackProject.customer._id,
      day: `${today}T03:00:00.000Z`
    },
    appointmentType: 'single'
  };

  return hashTrackAppointment;
};
