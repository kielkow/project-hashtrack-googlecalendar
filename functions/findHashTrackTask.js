module.exports = ({ hashTrackProject, googleEvent }) => {
  const task = hashTrackProject.tasks.find(
    (t) => t.name === googleEvent.summary.split('-')[2].trim()
  );

  return task;
};
