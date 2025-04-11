// Deploy To Netlify

const item_form = document.querySelector('#item-form'); 
const item_list = document.querySelector('#item-list');
const item_input = document.querySelector('#item-input');
const clear_button = document.querySelector('#clear');
const update_button = document.querySelector('.update');
const clear_cache = document.querySelector('#clear-cache');
const add_button = document.querySelector('.btn');

let items_array = ["apples", "orange juice", "oreos", "milk"];
let item_selected = "";

function showItems(){
    item_list.innerHTML = "";

    // ako ima nesto u kesu
    if(localStorage.getItem('array') !== null){
        let res = localStorage.array;
        let re = res.split(",");
        items_array = re;

        items_array.forEach((ele) => {
            let li = document.createElement('LI');
            li.textContent = ele;

            let btn = document.createElement('BUTTON');
            btn.classList.add('remove-item', 'btn-link', 'text-red')

            let icon = document.createElement('I');
            icon.classList.add('fa-solid', 'fa-xmark')

            item_list.appendChild(li);
            li.appendChild(btn);
            btn.appendChild(icon);
        })
    } else {
        items_array.forEach((ele) => {
            let li = document.createElement('LI');
            li.textContent = ele;

            let btn = document.createElement('BUTTON');
            btn.classList.add('remove-item', 'btn-link', 'text-red')

            let icon = document.createElement('I');
            icon.classList.add('fa-solid', 'fa-xmark')

            item_list.appendChild(li);
            li.appendChild(btn);
            btn.appendChild(icon);
        })
    }
}

// Add items to list via form
function addItem(e){
    e.preventDefault();

    let string = item_input.value;
    if(string !== "" && !items_array.includes(string)){
        items_array.push(string);
    }
    
    showItems();
    updateCache();
}

// Filter the items by typing in the filter field
function filterItems(){
    let string = item_input.value;
    if(string !== ""){
        item_list.innerHTML = "";
        items_array.forEach((ele) => {
            if(ele.includes(string) && string !== ""){
                let li = document.createElement('LI');
                li.textContent = ele;

                let btn = document.createElement('BUTTON');
                btn.classList.add('remove-item', 'btn-link', 'text-red')

                let icon = document.createElement('I');
                icon.classList.add('fa-solid', 'fa-xmark')

                item_list.appendChild(li);
                li.appendChild(btn);
                btn.appendChild(icon);
            }
        })  
    } else {
        showItems()
    }
}

// Click on an item to put into "edit mode" and add to form
function editMode(e){
    let selected = e.target;
    if(selected.tagName === "LI"){
        item_input.value = selected.textContent;
    }
    item_selected = selected.textContent;
}

// Update item
function updateItem() {
    let string = item_input.value;
    let index = items_array.indexOf(item_selected);
    if(index > -1){
        items_array.splice(index, 1, string)
    }
    updateCache();
    showItems();
}

// Remove items from list by clicking the "X" button
function removeItem(e){
    if(e.target.tagName === "I"){
        e.target.closest("LI").remove();

        items_array.forEach(item => {
            if(item === e.target.closest("LI").textContent){
                let index = items_array.indexOf(item);
                if(index > -1){
                    items_array.splice(index, 1);
                    updateCache();
                }
            }
        })
    }
}

// Clear all items with "clear" button
function clearAll(){
    items_array = []; // obrise niz
    localStorage.removeItem('array');
    showItems();
    updateCache();
}

// Update cache
function updateCache(){
    localStorage.setItem('array', items_array);
}

// Clear cache
function clearCache(){
    localStorage.removeItem('array')
    location.reload();
}

item_form.addEventListener('submit', addItem);
item_list.addEventListener('click', removeItem);
item_list.addEventListener('click', editMode);
update_button.addEventListener('click', updateItem);
clear_button.addEventListener('click', clearAll);
clear_cache.addEventListener('click', clearCache);
item_form.addEventListener('input', filterItems);

document.addEventListener('DOMContentLoaded', ()=> {
    showItems();
})