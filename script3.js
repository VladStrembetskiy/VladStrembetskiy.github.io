document.getElementById("addItemButton").addEventListener("click", addItem);

function addItem() {
  const input = document.getElementById("itemInput");
  const value = input.value.trim();

  if (value) {
    const list = document.getElementById("shoppingList");

    // Create list item
    const listItem = document.createElement("li");
    listItem.className = "list-item";

    // Add item text
    const itemText = document.createElement("span");
    itemText.textContent = value;

    // Add edit input
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = value;
    editInput.style.display = "none";

    // Add edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.addEventListener("click", () => toggleEdit(listItem, itemText, editInput));

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => deleteItem(listItem));

    // Append children
    listItem.appendChild(itemText);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);

    // Reset input field
    input.value = "";
    input.focus();
  }
}

function deleteItem(item) {
  if (confirm("Are you sure you want to delete this item?")) {
    item.remove();
  }
}

function toggleEdit(item, text, input) {
  const isEditing = input.style.display === "none";
  if (isEditing) {
    input.style.display = "inline";
    text.style.display = "none";
  } else {
    text.textContent = input.value.trim();
    input.style.display = "none";
    text.style.display = "inline";
  }
}
