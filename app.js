let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");

let chart;

function updateUI() {
  listEl.innerHTML = "";

  let balance = 0;

  transactions.forEach((t, index) => {

    const li = document.createElement("li");

    li.innerHTML = `
      <span>${t.desc} (${t.category})</span>
      <span>
        €${t.amount}
        <span class="delete" onclick="deleteTransaction(${index})">❌</span>
      </span>
    `;

    balance += t.type === "income" ? t.amount : -t.amount;

    listEl.appendChild(li);
  });

  balanceEl.textContent = `€${balance.toFixed(2)}`;

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateChart();
}

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if (!desc || !amount) return;

  transactions.push({ desc, amount, type, category });

  updateUI();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

function updateChart() {
  const ctx = document.getElementById("chart");

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Entrate", "Uscite"],
      datasets: [{
        data: [income, expense]
      }]
    }
  });
}

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

updateUI();