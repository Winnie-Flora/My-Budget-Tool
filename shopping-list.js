document.addEventListener("DOMContentLoaded", () => {
  const shoppingItems = document.getElementById("shopping-items")
  const addItemButton = document.getElementById("add-item")
  const totalAmount = document.getElementById("total-amount")
  const printShoppingListButton = document.getElementById("print-shopping-list")

  function addItem() {
    const newRow = document.createElement("tr")
    newRow.innerHTML = `
            <td><input type="text" class="item-input" placeholder="Enter item"></td>
            <td><input type="number" class="count-input" placeholder="Enter count"></td>
            <td><input type="number" class="price-input" placeholder="Enter price"></td>
            <td class="total-price">$0.00</td>
        `
    shoppingItems.appendChild(newRow)
  }

  function calculateTotalPrice(row) {
    const count = Number.parseFloat(row.querySelector(".count-input").value) || 0
    const price = Number.parseFloat(row.querySelector(".price-input").value) || 0
    const totalPrice = count * price
    row.querySelector(".total-price").textContent = `$${totalPrice.toFixed(2)}`
  }

  function calculateTotalAmount() {
    const totalPrices = document.querySelectorAll(".total-price")
    let total = 0
    totalPrices.forEach((price) => {
      total += Number.parseFloat(price.textContent.replace("$", "")) || 0
    })
    totalAmount.textContent = `$${total.toFixed(2)}`
  }

  addItemButton.addEventListener("click", addItem)

  shoppingItems.addEventListener("input", (e) => {
    if (e.target.classList.contains("count-input") || e.target.classList.contains("price-input")) {
      const row = e.target.closest("tr")
      calculateTotalPrice(row)
      calculateTotalAmount()
    }
  })

  printShoppingListButton.addEventListener("click", () => {
    window.print()
  })

  // Initialize with one item
  addItem()
})

