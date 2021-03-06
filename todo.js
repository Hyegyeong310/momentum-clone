const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoBtn = toDoForm.querySelector('i'),
  toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = [];
let newId = 0;

function filterFn(toDo) {
  return toDo.id === 1;
}

function deleteToDo(evt) {
  const btn = evt.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('i');
  const span = document.createElement('span');
  delBtn.classList.add('far', 'fa-times-circle');
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = ++newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(evt) {
  evt.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(toDo => paintToDo(toDo.text));
  }
}

function init() {
  loadToDos();
  toDoBtn.addEventListener('click', handleSubmit);
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
