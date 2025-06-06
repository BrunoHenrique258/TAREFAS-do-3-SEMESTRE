const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");

async function fetchExpenses() {
  const res = await fetch("/api/expenses");
  const expenses = await res.json();
  list.innerHTML = "";

  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.description} - R$ ${expense.amount.toFixed(2)} - 
      ${new Date(expense.date).toLocaleDateString("pt-BR")}
      <div>
        <button class="btn-edit" onclick="editExpense('${expense._id}')">Alterar</button>
        <button class="btn-delete" onclick="deleteExpense('${expense._id}')">Excluir</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function fetchTotalExpenses() {
  const res = await fetch("/api/expenses/total");
  const { total } = await res.json();
  totalEl.textContent = total.toFixed(2);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  await fetch("/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description, amount, date }),
  });

  form.reset();
  fetchExpenses();
  fetchTotalExpenses();
});

async function deleteExpense(id) {
  await fetch(`/api/expenses/${id}`, { method: "DELETE" });
  fetchExpenses();
  fetchTotalExpenses();
}

function editExpense(id) {
  // Aqui você pode abrir um modal ou popular os campos do formulário para edição
  alert("Funcionalidade de edição ainda não implementada.");
}

fetchExpenses();
fetchTotalExpenses();
