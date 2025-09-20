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
  function getRewardsByProjectId(id) { return data.rewardTiers.filter(r => r.projectId === id); }
  function getUsers() { return data.users; }
  function getPledges() { return data.pledges; }

  function updatePledgeAndProject(projectId, amount, userId, rewardName) {
    const project = getProjectById(projectId);
    if (project) {
      project.current += amount;
      data.pledges.push({
        user: userId,
        projectId: projectId,
        amount: amount,
        status: "success",
        reward: rewardName
      });
    }
    const selectedReward = getRewardsByProjectId(projectId).find(r => r.name === rewardName);
    if (selectedReward && selectedReward.quota > 0) {
      selectedReward.quota -= 1;
    }
    // ในการใช้งานจริง ควรมีการบันทึกข้อมูลนี้กลับไปที่เซิร์ฟเวอร์
  }
  
  function addFailedPledge(userId) {
     data.pledges.push({
        user: userId,
        projectId: null,
        amount: null,
        status: "failed",
        reward: null
      });
  }

  return { loadData, getProjects, getProjectById, getRewardsByProjectId, getUsers, getPledges, updatePledgeAndProject, addFailedPledge };
})();
