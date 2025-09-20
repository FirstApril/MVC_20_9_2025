const Model = (() => {
  let data = {};

  async function loadData() {
    if (!Object.keys(data).length) {
      const res = await fetch("data/db.json");
      data = await res.json();
    }
    return data;
  }

  function getProjects() { return data.projects; }
  function getProjectById(id) { return data.projects.find(p => p.id === id); }
  function getPledges() { return data.pledges; }

  return { loadData, getProjects, getProjectById, getPledges };
})();
