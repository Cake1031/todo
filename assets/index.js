const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
const todo_objs = [];

if(localStorage.getItem("todos_key")) {
    const get_todo_objs = JSON.parse(localStorage.getItem("todos_key"));
    get_todo_objs.forEach(todo_obj => {
        todo_objs.push(todo_obj);
        add(todo_obj);
    })
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(input.value) {
        const todo_obj = {
            text: input.value,
            complete: false
        }
        add(todo_obj);
        saveData(todo_obj);
    }
    input.value = "";
})

function add(get_todo_obj) {
    const li = document.createElement("li");
    li.innerText = get_todo_obj.text;
    if(get_todo_obj.complete) {
        li.classList.add("complete");
    }
    ul.appendChild(li);

    li.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        let lists = document.querySelectorAll("li");
        lists = [].slice.call(lists);
        const index = lists.indexOf(li);
        todo_objs.splice(index, 1);
        li.remove();
        saveData();
    })

    li.addEventListener("click", () => {
        li.classList.toggle("complete");
        let lists = document.querySelectorAll("li");
        lists = [].slice.call(lists);
        const index = lists.indexOf(li);
        if(li.classList.contains("complete")) {
            todo_objs[index].complete = true;
        } else {
            todo_objs[index].complete = false;
        }
        saveData();
    })
}

function saveData(get_todo_obj) {
    if(get_todo_obj) {
        todo_objs.push(get_todo_obj);
    }
    localStorage.setItem("todos_key", JSON.stringify(todo_objs));
}