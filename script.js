const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')

function addItem(e){
    e.preventDefault();
    const newItem = itemInput.value;

    // Validate
    if(newItem === ""){
        alert('Add someting')
        return;
    }

    // Create list
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem))

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)

    itemList.appendChild(li);
    itemInput.value = "";
}

function createButton(clases){
    const button = document.createElement('button');
    button.classList = clases;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon)
    return button
}

function createIcon(clases){
    const icon = document.createElement('i');
    icon.classList = clases;
    return icon
}

// Event listener
itemForm.addEventListener('submit', addItem);