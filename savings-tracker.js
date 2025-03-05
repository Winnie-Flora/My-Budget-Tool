document.addEventListener("DOMContentLoaded", () => {
  const annualGoalInput = document.getElementById("annual-goal")
  const setGoalButton = document.getElementById("set-goal")
  const monthlyGoalDisplay = document.getElementById("monthly-goal")
  const monthlyTrackerBody = document.getElementById("monthly-tracker").querySelector("tbody")
  const totalAnnualSavings = document.getElementById("total-annual-savings")
  const goalProgressBar = document.getElementById("goal-progress-bar")
  const remainingToGoal = document.getElementById("remaining-to-goal")
  const printSavingsTrackerButton = document.getElementById("print-savings-tracker")

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  let annualGoal = 0
  let monthlyGoal = 0

  function updateGoals() {
    annualGoal = Number.parseFloat(annualGoalInput.value) || 0
    monthlyGoal = annualGoal / 12
    monthlyGoalDisplay.textContent = `$${monthlyGoal.toFixed(2)}`
    updateMonthlyTracker()
    updateGoalProgress()
  }

  function updateMonthlyTracker() {
    monthlyTrackerBody.innerHTML = ""
    months.forEach((month) => {
      const row = document.createElement("tr")
      row.innerHTML = `
            <td>${month}</td>
            <td><input type="number" class="amount-input" placeholder="Enter amount" data-month="${month}" value="0"></td>
            <td><div class="checkbox done" data-type="done"></div></td>
            <td><div class="checkbox not-done checked" data-type="not-done"></div></td>
        `
      monthlyTrackerBody.appendChild(row)

      // Initialize checkboxes
      const input = row.querySelector(".amount-input")
      updateCheckboxes(input)
    })
  }

  function updateCheckboxes(input) {
    const amount = Number.parseFloat(input.value) || 0
    const row = input.closest("tr")
    const doneCheckbox = row.querySelector(".checkbox.done")
    const notDoneCheckbox = row.querySelector(".checkbox.not-done")

    if (amount > 0) {
      doneCheckbox.classList.add("checked")
      notDoneCheckbox.classList.remove("checked")
    } else {
      doneCheckbox.classList.remove("checked")
      notDoneCheckbox.classList.add("checked")
    }
  }

  function calculateTotalSavings() {
    const amounts = document.querySelectorAll(".amount-input")
    let total = 0
    amounts.forEach((amount) => {
      total += Number.parseFloat(amount.value) || 0
    })
    totalAnnualSavings.textContent = `$${total.toFixed(2)}`
    return total
  }

  function updateGoalProgress() {
    const totalSavings = calculateTotalSavings()
    const progress = (totalSavings / annualGoal) * 100
    goalProgressBar.style.width = `${Math.min(progress, 100)}%`
    const remaining = Math.max(annualGoal - totalSavings, 0)
    remainingToGoal.textContent = `$${remaining.toFixed(2)}`
  }

  setGoalButton.addEventListener("click", updateGoals)

  monthlyTrackerBody.addEventListener("input", (e) => {
    if (e.target.classList.contains("amount-input")) {
      updateCheckboxes(e.target)
      updateGoalProgress()
    }
  })

  printSavingsTrackerButton.addEventListener("click", () => {
    window.print()
  })

  // Initialize the tracker
  updateMonthlyTracker()
})

