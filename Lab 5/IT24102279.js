// ===== LAB 5 CODE =====

let form = document.forms[0];
let title = document.getElementsByTagName("h1")[0];
let image = document.getElementById("travelImg");   
let table = document.getElementById("travelerTable");

// Task 1 - DOM Traversal
let formContainer = form.parentNode;
let inputs = form.children;         

for (let i = 0; i < inputs.length; i++) {
  if (inputs[i].tagName === "INPUT") {
    inputs[i].style.backgroundColor = "#eef";
  }
  console.log("Child tag:", inputs[i].tagName);
}

// Task 2 - Dynamic traveler counter
let countPara = document.createElement("p");
countPara.id = "travelerCount";
countPara.innerText = "Total Registered Travelers: 0";
document.body.appendChild(countPara);

function updateCount() {
  let count = table.rows.length - 1;
  countPara.innerText = "Total Registered Travelers: " + count;
}

window.onload = function () {
  console.log("Page URL:", document.URL);
  console.log("Last Modified:", document.lastModified);
  document.title = "Travel Adventures - DOM Lab";
};

title.style.color = "darkblue";
title.style.fontSize = "36px";
title.style.fontFamily = "Arial";

setTimeout(function () {
  document.body.style.backgroundColor = "#5490c5ff";
}, 2000);

image.onmouseover = function () {
  image.style.border = "5px solid orange";
};
image.onmouseout = function () {
  image.style.border = "none";
};

let img1 = new Image();
let img2 = new Image();
img1.src = "images.jpg";
img2.src = "images2.jpg";

image.ondblclick = function () {
  image.src = img2.src;
};

// Task 4 - Form validation
let submitBtn = document.querySelector('input[type="submit"]');
let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let emailInput = document.getElementById("email");

submitBtn.disabled = true;

function validateForm() {
  let valid = true;

  if (nameInput.value.trim() === "") {
    nameInput.style.border = "2px solid red";
    valid = false;
  } else {
    nameInput.style.border = "";
  }

  let ageVal = parseInt(ageInput.value, 10);
  if (isNaN(ageVal) || ageVal < 0) {
    ageInput.style.border = "2px solid red";
    valid = false;
  } else {
    ageInput.style.border = "";
  }

  if (!emailInput.value.includes("@")) {
    emailInput.style.border = "2px solid red";
    valid = false;
  } else {
    emailInput.style.border = "";
  }

  submitBtn.disabled = !valid;
}

nameInput.onkeyup = validateForm;
ageInput.onkeyup = validateForm;
emailInput.onkeyup = validateForm;

form.onsubmit = function (event) {
  event.preventDefault();
  addTraveler();
};

// Task 3 - Add traveler with conditional styling
function addTraveler() {
  let name = nameInput.value.trim();
  let age = parseInt(ageInput.value, 10);
  let email = emailInput.value.trim();

  if (submitBtn.disabled) return;

  let row = table.insertRow();

  row.insertCell(0).innerText = name;
  row.insertCell(1).innerText = age;
  row.insertCell(2).innerText = email;

  let deleteCell = row.insertCell(3);
  let btn = document.createElement("button");
  btn.innerText = "Delete";
  deleteCell.appendChild(btn);

  // Task 3 - Conditional styling based on age
  if (age < 18) {
    row.style.backgroundColor = "#fff3cd"; 
  } else if (age >= 60) {
    row.style.backgroundColor = "#d1ecf1";
  }

  updateCount();  
  form.reset();
  validateForm(); 
}

// Task 6 - Event delegation for delete buttons
table.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    let row = e.target.parentNode.parentNode;
    row.remove();
    updateCount();
  }
});

// Task 7 - Filter functionality
let ageFilter = document.getElementById("ageFilter");
if (ageFilter) {
  ageFilter.onchange = function () {
    let filter = this.value;
    let rows = table.rows;

    for (let i = 1; i < rows.length; i++) {
      let age = parseInt(rows[i].cells[1].innerText, 10);
      
      if (filter === "all") {
        rows[i].style.display = "";
      } else if (filter === "under18") {
        rows[i].style.display = age < 18 ? "" : "none";
      } else if (filter === "adult") {
        rows[i].style.display = (age >= 18 && age < 60) ? "" : "none";
      } else if (filter === "senior") {
        rows[i].style.display = age >= 60 ? "" : "none";
      }
    }
  };
}

// inclasss test

// Create new section for shopping list
let newSection = document.createElement("div");
newSection.innerHTML = `
  <h2>Shopping List</h2>
  <form id="shoppingForm">
    <label>Item Name:</label><br>
    <input type="text" id="itemName"><br><br>
    <label>Quantity:</label><br>
    <input type="number" id="itemQuantity" min="1"><br><br>
    <button type="submit">Add Item</button>
  </form>
  <p id="shoppingError" style="color: red;"></p>
  <h3>Items:</h3>
  <ul id="shoppingList"></ul>
`;

// Insert after the traveler form
document.getElementById("studentForm").parentNode.insertBefore(
  newSection, 
  document.getElementById("studentForm").nextSibling
);

// Get shopping list elements
let shoppingForm = document.getElementById("shoppingForm");
let itemName = document.getElementById("itemName");
let itemQuantity = document.getElementById("itemQuantity");
let shoppingError = document.getElementById("shoppingError");
let shoppingList = document.getElementById("shoppingList");

// Add item to shopping list
shoppingForm.onsubmit = function(event) {
  event.preventDefault();
  
  let name = itemName.value.trim();
  let qty = parseInt(itemQuantity.value);
  
  // Validation
  if (name === "") {
    shoppingError.innerText = "Item name cannot be empty";
    return;
  }
  
  if (isNaN(qty) || qty <= 0) {
    shoppingError.innerText = "Quantity must be a positive number";
    return;
  }
  
  shoppingError.innerText = "";
  
  // Create list item using DOM methods
  let li = document.createElement("li");
  
  let itemText = document.createElement("span");
  itemText.innerHTML = `${name} - Quantity: ${qty} `;
  
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  
  li.appendChild(itemText);
  li.appendChild(deleteBtn);
  shoppingList.appendChild(li);
  
  // Clear form
  shoppingForm.reset();
};

// Event delegation for delete buttons (like Task 6)
shoppingList.addEventListener("click", function(e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  }
});