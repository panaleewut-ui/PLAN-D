// คำนวณ TDEE
function calculateTDEE() {
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseFloat(document.getElementById("age").value);
  const activity = parseFloat(document.getElementById("activity").value);

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

// รับค่า goal จาก dropdown
  const goal = document.getElementById("goal").value;

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
  localStorage.setItem("tdeeFinal", finalTdee);
  localStorage.setItem("goalText", goalText);
  localStorage.setItem("tdee", tdee);
  window.location.href = "result.html";
  
}

// แสดงผลใน result.html
window.onload = function() {
  const tdee = localStorage.getItem("tdee");
  if (tdee && document.getElementById("tdeeResult")) 
    document.getElementById("tdeeResult").innerText = `TDEE ของคุณคือ ${tdee} kcal`;

    // ตัวอย่างข้อมูลจำลอง (ฐานข้อมูลจะมาแทนที่)
    const foodData = [
      { type: "ข้าว-แป้ง", total: 6 },
      { type: "เนื้อสัตว์", total: 3 },
      { type: "ผัก", total: 4 },
      { type: "ผลไม้", total: 2 },
      { type: "นม", total: 1 },
      { type: "ไขมัน", total: 3 },
    ];

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




