const View = (() => {
  function renderProjectList(projects) {
    const container = document.getElementById("projectList");
    container.innerHTML = projects.map(p => `
      <div class="card">
        <h3>${p.name}</h3>
        <p>เป้าหมาย: ${p.goal} บาท</p>
        <p>สิ้นสุด: ${p.deadline}</p>
        <a href="project.html?id=${p.id}">รายละเอียด</a>
      </div>
    `).join("");
  }

  function renderProjectDetail(project) {
    const container = document.getElementById("projectDetail");
    const percent = Math.min(100, (project.current / project.goal * 100).toFixed(1));
    container.innerHTML = `
      <h2>${project.name}</h2>
      <p>${project.description}</p>
      <p>เป้าหมาย: ${project.goal} บาท</p>
      <p>ระดมแล้ว: ${project.current} บาท</p>
      <div class="progress"><div style="width:${percent}%"></div></div>
    `;
  }

  function renderStats(pledges) {
    const success = pledges.filter(p => p.status === "success").length;
    const failed = pledges.filter(p => p.status === "failed").length;
    document.getElementById("statsView").innerHTML = `
      <p>สนับสนุนสำเร็จ: ${success} ครั้ง</p>
      <p>สนับสนุนถูกปฏิเสธ: ${failed} ครั้ง</p>
    `;
  }

  return { renderProjectList, renderProjectDetail, renderStats };
})();
