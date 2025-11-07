// ✅ ฟังก์ชันคำนวณ TDEE
function calculateTDEE() {
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseFloat(document.getElementById("age").value);
  const activity = parseFloat(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;

  if (!weight || !height || !age) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  let bmr;
  if (gender === "male") {
    bmr = 66.5 + (13.8 * weight) + (5 * height) - (6.8 * age);
  } else {
    bmr = 655.1 + (9.6 * weight) + (1.9 * height) - (4.7 * age);
  }

  const tdee = Math.round(bmr * activity);
  let finalTdee = tdee;
  let goalText = "คงน้ำหนัก";

  if (goal === "lose") {
    finalTdee = tdee - 500;
    goalText = "ลดน้ำหนัก";
  } else if (goal === "gain") {
    finalTdee = tdee + 500;
    goalText = "เพิ่มน้ำหนัก";
  }

  localStorage.setItem("tdeeFinal", finalTdee);
  localStorage.setItem("goalText", goalText);
  localStorage.setItem("weight", weight);

  window.location.href = "result.html";
}

// ✅ หาแผนอาหารจาก kcal ช่วง + โปรตีน
function findFoodPlan(tdee, weight) {
  const proteinNeed = weight * 1.0;

  return foodPlans.find(plan =>
    tdee >= plan.energyRange[0] &&
    tdee <= plan.energyRange[1] &&
    proteinNeed >= plan.proteinRange[0] &&
    proteinNeed <= plan.proteinRange[1]
  );
}

// ✅ โหลดข้อมูลหน้า result
window.onload = function () {
  if (!document.getElementById("foodTable")) return;

  const tdee = parseFloat(localStorage.getItem("tdeeFinal")) || 0;
  const goalText = localStorage.getItem("goalText") || "คงน้ำหนัก";
  const weight = parseFloat(localStorage.getItem("weight")) || 60;

  document.getElementById("goalResult").textContent = `เป้าหมาย: ${goalText}`;
  document.getElementById("tdeeResult").textContent = `TDEE: ${tdee} kcal`;

  const plan = findFoodPlan(tdee, weight);
  const tbody = document.getElementById("foodTable");

  if (!plan) {
    tbody.innerHTML = `<tr><td colspan="4">ยังไม่มีข้อมูลชุดนี้</td></tr>`;
    return;
  }

  plan.portions.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.type}</td>
      <td>${item.total}</td>
      <td>${(item.total / 3).toFixed(1)}</td>
      <td>${(item.total / 2).toFixed(1)}</td>
    `;
    tbody.appendChild(tr);
  });
};

// ✅ ให้ HTML ใช้งานฟังก์ชันนี้ได้
window.calculateTDEE = calculateTDEE;

// ✅ Event submit form
document.getElementById("infoForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  calculateTDEE();
});

window.findFoodPlan = findFoodPlan;

