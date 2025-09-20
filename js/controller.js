const Controller = (() => {
  async function initProjectList() {
    await Model.loadData();
    View.renderProjectList(Model.getProjects());
  }

  async function initProjectDetail() {
    await Model.loadData();
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const project = Model.getProjectById(id);
    if (project) View.renderProjectDetail(project);
  }

  async function initStats() {
    await Model.loadData();
    View.renderStats(Model.getPledges());
  }

  return { initProjectList, initProjectDetail, initStats };
})();
