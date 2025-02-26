document.addEventListener("DOMContentLoaded", () => {
    const annualGoalInput = document.getElementById("annual-goal")
    const setGoalButton = document.getElementById("set-goal")
    const monthlyGoalDisplay = document.getElementById("monthly-goal")
    const monthlyTrackerBody = document.getElementById("monthly-tracker").querySelector("tbody")
  
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
    }
  
    function updateMonthlyTracker() {
      monthlyTrackerBody.innerHTML = ""
      months.forEach((month) => {
        const row = document.createElement("tr")
        row.innerHTML = `
                  <td>${month}</td>
                  <td><div class="checkbox" data-type="done"></div></td>
                  <td><div class="checkbox" data-type="not-done"></div></td>
              `
        monthlyTrackerBody.appendChild(row)
      })
    }
  
    setGoalButton.addEventListener("click", updateGoals)
  
    monthlyTrackerBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("checkbox")) {
        const type = e.target.dataset.type
        const otherCheckbox = e.target
          .closest("tr")
          .querySelector(`.checkbox[data-type="${type === "done" ? "not-done" : "done"}"]`)
  
        e.target.classList.toggle(type)
        otherCheckbox.classList.remove(otherCheckbox.dataset.type)
      }
    })
  
    // Initialize the tracker
    updateMonthlyTracker()
  })
  
  