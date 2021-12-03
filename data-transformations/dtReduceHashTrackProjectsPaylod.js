module.exports = ({ hashTrackProjects }) => {
  const projects = hashTrackProjects.map((project) => ({
    project_id: project._id,
    project_name: project.name,
    customer_id: project.customer._id,
    customer_name: project.customer.name,
  }));

  return projects;
};
