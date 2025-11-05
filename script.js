import foodPlans from ".data.js";

// คำนวณ TDEE
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

// เก็บค่าลง localStorage เพื่อไปใช้หน้า result.html
  localStorage.setItem("tdee", tdee);
  localStorage.setItem("tdeeFinal", finalTdee);
  localStorage.setItem("goalText", goalText);
  localStorage.setItem("weight", weight);
  
// เปลี่ยนหน้า หลังจากเก็บค่าเรียบร้อย
  window.location.href = "result.html";
  
}

// ✅ เลือก portion ตาม TDEE & โปรตีน (โปรตีนน้ำหนัก x 1.0 )
function findFoodPlan(tdee, weight) {
  const proteinNeed = weight * 1.0; 

  return foodPlans.find(plan =>
    tdee >= plan.energyRange[0] &&
    tdee <= plan.energyRange[1] &&
    proteinNeed >= plan.proteinRange[0] &&
    proteinNeed <= plan.proteinRange[1]
  );
}

// แสดงผลใน result.html
window.onload = function() {
  const tdeeFinal = parseFloat(localStorage.getItem("tdeeFinal")) || 0;
  const goalText = localStorage.getItem("goalText") || "คงน้ำหนัก";
  const weight = parseFloat(localStorage.getItem("weight")) || 60;

  if (document.getElementById("goalResult")) {
    document.getElementById("goalResult").textContent = `เป้าหมาย: ${goalText}`;
  }

  if (document.getElementById("tdeeResult")) {
    document.getElementById("tdeeResult").textContent = 
      `พลังงานที่ใช้คำนวณ (TDEE ปรับแล้ว): ${tdeeFinal.toFixed(0)} kcal`;
  }



    const tbody = document.getElementById("foodTable");
    foodData.forEach(f => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${f.type}</td>
        <td>${f.total}</td>
        <td>${(f.total/3).toFixed(1)}</td>
        <td>${(f.total/2).toFixed(1)}</td>
      `;
      tbody.appendChild(tr);
    });
  };

function goBack() {
  window.location.href = "form.html";

}












