const View = (() => {
  function renderProjectList(projects) {
    const container = document.getElementById("projectList");
    if (!projects.length) {
      container.innerHTML = "<p>ไม่พบโครงการ</p>";
      return;
    }
    container.innerHTML = projects.map(p => {
      const percent = Math.min(100, (p.current / p.goal * 100).toFixed(1));
      return `
        <div class="card">
          <h3>${p.name}</h3>
          <p>เป้าหมาย: ${p.goal} บาท</p>
          <p>ระดมแล้ว: ${p.current} บาท</p>
          <p>สิ้นสุด: ${p.deadline}</p>
          <div class="progress"><div style="width:${percent}%"></div></div>
          <a href="project.html?id=${p.id}">รายละเอียด</a>
        </div>
      `;
    }).join("");
  }

  function renderProjectDetail(project, rewards) {
    const container = document.getElementById("projectDetail");
    const percent = Math.min(100, (project.current / project.goal * 100).toFixed(1));

    container.innerHTML = `
      <h2>${project.name}</h2>
      <p><strong>คำอธิบาย:</strong> ${project.description}</p>
      <p><strong>เป้าหมาย:</strong> ${project.goal} บาท</p>
      <p><strong>ระดมแล้ว:</strong> ${project.current} บาท</p>
      <p><strong>สิ้นสุด:</strong> ${project.deadline}</p>
      <div class="progress"><div style="width:${percent}%"></div></div>
      <h3>ระดับรางวัล (Reward Tiers)</h3>
      ${rewards.map(r => `
        <div class="reward">
          <p><strong>${r.name}</strong></p>
          <p>ขั้นต่ำ: ${r.minAmount} บาท</p>
          <p>คงเหลือ: ${r.quota}</p>
        </div>
      `).join("")}
      <div class="pledgeForm">
        <h3>สนับสนุนโครงการนี้</h3>
        <label>จำนวนเงินที่สนับสนุน:</label>
        <input type="number" id="pledgeAmount" min="1">
        <label>เลือกระดับรางวัล:</label>
        <select id="rewardSelect">
          <option value="">ไม่เลือกรางวัล</option>
          ${rewards.map(r => `<option value="${r.name}" data-min="${r.minAmount}" data-quota="${r.quota}">${r.name} (ขั้นต่ำ ${r.minAmount} บาท, เหลือ ${r.quota})</option>`).join("")}
        </select>
        <button onclick="Controller.makePledge('${project.id}')">ยืนยันการสนับสนุน</button>
      </div>
    `;
  }
  
  function renderNotFound() {
      document.getElementById("projectDetail").innerHTML = "<p>ไม่พบโครงการ</p>";
  }

  function renderStats(pledges) {
    const success = pledges.filter(p => p.status === "success").length;
    const failed = pledges.filter(p => p.status === "failed").length;
    const totalAmount = pledges
      .filter(p => p.status === "success")
      .reduce((sum, p) => sum + p.amount, 0);

    document.getElementById("statsView").innerHTML = `
      <div class="stats">
        <p class="success">✅ สนับสนุนสำเร็จ: ${success} ครั้ง</p>
        <p class="failed">❌ สนับสนุนถูกปฏิเสธ: ${failed} ครั้ง</p>
        <p><strong>💰 ยอดรวมที่สนับสนุนสำเร็จ:</strong> ${totalAmount} บาท</p>
      </div>
    `;
  }
  
  function renderUserSelect(users) {
      const sel = document.getElementById("userSelect");
      users.forEach(u => {
        let opt = document.createElement("option");
        opt.value = u.id;
        opt.textContent = u.name;
        sel.appendChild(opt);
      });
  }

  return { renderProjectList, renderProjectDetail, renderStats, renderNotFound, renderUserSelect };
})();
