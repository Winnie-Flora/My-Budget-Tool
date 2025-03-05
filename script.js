document.addEventListener("DOMContentLoaded", () => {
  const budgetItems = document.getElementById("budget-items")
  const addRowButton = document.getElementById("add-row")
  const totalAmount = document.getElementById("total-amount")
  const incomeInput = document.getElementById("income-input")
  const totalExpenditure = document.getElementById("total-expenditure")
  const remainingAmount = document.getElementById("remaining-amount")
  const printBudgetButton = document.getElementById("print-budget")

  function addRow() {
    const newRow = document.createElement("tr")
    newRow.innerHTML = `
            <td><input type="text" class="item-input" placeholder="Enter item"></td>
            <td><input type="number" class="amount-input" placeholder="Enter amount"></td>
        `
    budgetItems.appendChild(newRow)
  }

  function calculateTotal() {
    const amounts = document.querySelectorAll(".amount-input")
    let total = 0
    amounts.forEach((amount) => {
      total += Number.parseFloat(amount.value) || 0
    })
    totalAmount.textContent = `$${total.toFixed(2)}`
    totalExpenditure.textContent = `$${total.toFixed(2)}`
    updateRemaining()
  }

  function updateRemaining() {
    const income = Number.parseFloat(incomeInput.value) || 0
    const expenditure = Number.parseFloat(totalExpenditure.textContent.replace("$", "")) || 0
    const remaining = income - expenditure
    remainingAmount.textContent = `$${remaining.toFixed(2)}`

    if (remaining < 0) {
      remainingAmount.style.color = "red"
    } else {
      remainingAmount.style.color = "green"
    }
  }

  addRowButton.addEventListener("click", addRow)

  budgetItems.addEventListener("input", (e) => {
    if (e.target.classList.contains("amount-input")) {
      calculateTotal()
    }
  })

  incomeInput.addEventListener("input", updateRemaining)

  printBudgetButton.addEventListener("click", () => {
    window.print()
  })

  // Initialize with one row
  addRow()
})

