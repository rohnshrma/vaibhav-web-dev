let expenses = [
  { name: "eat", amount: 100 },
  { name: "dinner", amount: 200 },
];

function show_title() {
  alert(
    "\n===========================\n      Expense Tracker      \n===========================\n"
  );
}

// show_title();

function show_menu() {
  alert(`\nChoose an option :
\n1. Add Expense
\n2. Show Total Expense
\n3. Show All Expenses
\n4. Exit
`);
}

// show_menu();

function add_expense() {
  let name = prompt("Enter Expense Name : ");
  let amount = Number(prompt("Enter Expense Amount : "));

  if (amount <= 0) {
    alert("\n❌Invalid Amount! Expense must be greater than 0");
    return;
  }

  let expense = {
    name,
    amount,
  };
  expenses.push(expense);
  alert(`✅ Expense ${name} of ₹${amount} added!`);
}

// add_expense();

function show_total_expense() {
  if (expenses.length === 0) {
    console.log("No Expenses Added Yet!");
    return;
  }

  let total_expense = 0;
  for (let expense of expenses) {
    total_expense += expense.amount;
  }

  alert(`💰 Total Expense : ₹${total_expense}`);
}

// show_total_expense();

function show_all_expenses() {
  if (expenses.length === 0) {
    console.log("No Expenses Added Yet!");
    return;
  }

  let all_expenses = "\nExpense List :";

  for (let i = 0; i < expenses.length; i++) {
    all_expenses += `\n${i + 1}. ${expenses[i].name} -  ${expenses[i].amount}`;
  }

  alert(all_expenses);
}

// show_all_expenses();

show_title();
while (true) {
  show_menu();
  let choice = Number(prompt("Enter your choice (1-4) : "));

  if (choice === 1) add_expense();
  else if (choice === 2) show_total_expense();
  else if (choice === 3) show_all_expenses();
  else if (choice === 4) {
    alert("Thanks for using expense tracker!");
    break;
  } else alert("Invalid Choice! Please Choose Between 1-4");
}
