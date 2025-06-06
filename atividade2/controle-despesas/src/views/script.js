const API = '/api/expenses';

async function fetchExpenses() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById('expenses-list');
  list.innerHTML = '';
  data.forEach(exp => {
    const div = document.createElement('div');
    div.innerHTML = `
      ${exp.description} - R$${exp.amount.toFixed(2)} - ${new Date(exp.date).toLocaleDateString()}
      <button onclick="editExpense('${exp._id}')">Alterar</button>
      <button onclick="deleteExpense('${exp._id}')">Excluir</button>
    `;
    list.appendChild(div);
  });
}

async function fetchTotalExpenses() {
  const res = await fetch(`${API}/total`);
  const total = await res.json();
  document.getElementById('total').innerText = total.toFixed(2);
}

async function addExpense() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;
  if (!description || !amount || !date) return alert("Preencha todos os campos corretamente!");
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description, amount, date })
  });
  fetchExpenses();
  fetchTotalExpenses();
}

async function deleteExpense(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  fetchExpenses();
  fetchTotalExpenses();
}

window.onload = () => {
  fetchExpenses();
  fetchTotalExpenses();
};
