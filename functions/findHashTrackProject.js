module.exports = ({ hashTrackProjects, googleEvent }) => {
  const project = hashTrackProjects.find(
    (p) => (
      p.name === googleEvent.summary.split('-')[1].trim()
      && p.customer.name === googleEvent.summary.split('-')[0].trim()
    )
  );

  return project;
};
