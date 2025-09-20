const Controller = (() => {
  async function initProjectList() {
    await Model.loadData();
    View.renderProjectList(Model.getProjects());

    const searchBox = document.getElementById("searchBox");
    const sortSelect = document.getElementById("sortSelect");

    function updateView() {
      let filtered = Model.getProjects().filter(p => 
        p.name.toLowerCase().includes(searchBox.value.toLowerCase())
      );
      filtered = sortProjects(filtered, sortSelect.value);
      View.renderProjectList(filtered);
    }

    function sortProjects(projects, type) {
      if (type === "newest") {
        return projects.sort((a, b) => Number(b.id) - Number(a.id));
      } else if (type === "deadline") {
        return projects.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      } else if (type === "funded") {
        return projects.sort((a, b) => b.current - a.current);
      }
      return projects;
    }

    searchBox.addEventListener("input", updateView);
    sortSelect.addEventListener("change", updateView);
    updateView();
  }

  async function initProjectDetail() {
    await Model.loadData();
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const project = Model.getProjectById(id);
    const rewards = Model.getRewardsByProjectId(id);
    if (project) View.renderProjectDetail(project, rewards);
    else View.renderNotFound();
  }

  async function initStats() {
    await Model.loadData();
    View.renderStats(Model.getPledges());
  }
  
  async function initLogin() {
    await Model.loadData();
    View.renderUserSelect(Model.getUsers());
  }

  async function login() {
    const userId = document.getElementById("userSelect").value;
    sessionStorage.setItem("currentUser", userId);
    alert("เข้าสู่ระบบสำเร็จ!");
    window.location.href = "index.html";
  }

  async function makePledge(projectId) {
    const userId = sessionStorage.getItem("currentUser");
    if (!userId) {
      alert("กรุณาเข้าสู่ระบบก่อน");
      window.location.href = "login.html";
      return;
    }
    const amount = Number(document.getElementById("pledgeAmount").value);
    const rewardSel = document.getElementById("rewardSelect");
    const rewardName = rewardSel.value;
    const min = Number(rewardSel.options[rewardSel.selectedIndex].dataset.min || 0);

    const project = Model.getProjectById(projectId);
    const rewards = Model.getRewardsByProjectId(projectId);
    const selectedReward = rewards.find(r => r.name === rewardName);
    
    let status = "failed";
    if (new Date(project.deadline) > new Date() && amount >= min) {
      if (!selectedReward || selectedReward.quota > 0) {
        status = "success";
      }
    }
    
    if (status === "success") {
      Model.updatePledgeAndProject(projectId, amount, userId, rewardName);
      alert("✅ สนับสนุนสำเร็จ!");
      window.location.reload(); 
    } else {
      Model.addFailedPledge(userId);
      alert("❌ การสนับสนุนไม่ผ่านตามกติกา");
    }
  }

  return { initProjectList, initProjectDetail, initStats, initLogin, login, makePledge };
})();
