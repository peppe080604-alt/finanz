let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");

function updateUI() {
  listEl.innerHTML = "";

  let balance = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.textContent = `${t.desc} - €${t.amount}`;

    balance += t.type === "income" ? t.amount : -t.amount;

    listEl.appendChild(li);
  });

  balanceEl.textContent = `€${balance.toFixed(2)}`;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!desc || !amount) return;

  transactions.push({ desc, amount, type });

  updateUI();
}

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

updateUI();