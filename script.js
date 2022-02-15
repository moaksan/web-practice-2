
function displayFolder(){
  const folderList=document.querySelector('.folder-list');
  folderList.textContent="";
  for(let i=0;i<data.length;i++){
    const folder=FolderHTMLString(i);
    folderList.appendChild(folder);
  }
}
function FolderHTMLString(i){
  let folder=data[i];
  const folderitem=document.createElement('div');
  folderitem.setAttribute('class', 'folder-item');
  if(currentFolderIndex==i){
    folderitem.setAttribute('class', 'folder-item current-folder');
  }
  const name=document.createElement('div');
  name.setAttribute('class', 'name');
  name.textContent=folder.name;
  const deletefolder=document.createElement('button');
  deletefolder.setAttribute('class','delete-folder');
  deletefolder.innerHTML=`<img src="img/delete_black_24dp.svg" alt="delete">`

  folderitem.append(name, deletefolder);
  return folderitem;
}
function createFolder(){
  const folderList=document.querySelector('.folder-list');
  
  if(!isFolderCreating){
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.setAttribute('class', 'add-folder');
    form.appendChild(input);
    folderList.appendChild(form);
    isFolderCreating=true;
    form.addEventListener('submit', e=>addFolder(e));
  }
}

function addFolder(e){
  e.preventDefault();
  const form=document.querySelector('.add-folder').parentNode;
  const input=document.querySelector('.add-folder');
  const value=input.value.trim();
  form.remove();
  isFolderCreating=false;
  
  if(value.length===0){
    alert('Folder name cannot be blank.');
    return;
  }
  if(value.length>40){
    alert('Folder name is too long.');
    return;
  }
  for(let i=0;i<data.length;i++){
    if(value==data[i]['name']){
      alert('There is a folder that has same name.');
      return;
    }
  }
  const newitem={
    "name":value,
    "list":[]
  }
  data.push(newitem);
  currentFolderIndex=data.length-1;
  displayFolder();
  displayList();
}
function deleteFolder(node){
  const name=node.parentNode.querySelector('.name').textContent;
  let deleteFolderIndex=0;
  for(let i=0;i<data.length;i++){
    if(data[i]['name']==name){
      data.splice(i,1);
      deleteFolderIndex=i;
    }
  }
  if(currentFolderIndex==deleteFolderIndex){
    currentFolderIndex=0;
  }
  displayFolder();
  displayList();
}
function displayList(){
  const todolist=document.querySelector('.todo-list');
  todolist.textContent='';
  if(data.length===0)
    return;
  for(let i of data[currentFolderIndex].list){
    const todoitem=document.createElement('div');
    todoitem.setAttribute('class', 'todo-item');

    const listMarker=`
      <img src="img/circle_black_24dp.svg" alt="" class="list-marker"></img>
    `;
    todoitem.innerHTML=listMarker;

    const content=document.createElement('div');
    content.setAttribute('class', 'content');
    content.textContent=i;
    todoitem.appendChild(content);

    const deleteTodo=document.createElement('button');
    const deleteTodoImg=document.createElement('img');
    deleteTodo.setAttribute('class', 'delete-todo');
    deleteTodoImg.setAttribute('src', 'img/clear_black_24dp.svg');
    deleteTodo.appendChild(deleteTodoImg);
    todoitem.appendChild(deleteTodo);

    todolist.appendChild(todoitem);
  }
}
function createList(e){
  e.preventDefault();
  const input=e.target.querySelector('.add-item');
  const value=input.value.trim();
  input.value=null;
  if(value.length===0){
    return;
  }
  data[currentFolderIndex].list.push(value);
  displayList();
}
function deleteList(e){
  const todoitem=e.target.parentNode.parentNode.querySelector('.content').textContent;
  for(let i=0;i<data[currentFolderIndex].list.length;i++){
    if(data[currentFolderIndex].list[i]==todoitem){
      data[currentFolderIndex].list.splice(i,1);
    }
  }
  displayList();
}

function setEventListeners(){
  const createFolderBtn=document.querySelector('.create-folder');
  const folderList=document.querySelector('.folder-list');
  const addItem=document.querySelector('.add-item'); 
  const todolist=document.querySelector('.todo-list');

  createFolderBtn.addEventListener('click', ()=>createFolder());
  
  folderList.addEventListener('click', e=>{
    const node=e.target.parentNode;
    if(node.className=='delete-folder'){
      currentFolderIndex=0;
      deleteFolder(node);
    }
  });
  document.addEventListener('mousedown', e=>{
    if(e.target.className !== 'add-folder' && document.querySelector('.add-folder')){
      const form=document.querySelector('.add-folder').parentNode;
      form.remove();
      isFolderCreating=false;
    }
    if(e.target.className=='name' && e.target.parentNode.className=='folder-item'){
      const folder=e.target;
      for(let i=0;i<data.length;i++){
        if(data[i].name==folder.textContent){
          currentFolderIndex=i;
        }
      }
      displayFolder();
      displayList();
    }
  });
  const temp=addItem.parentNode;
  temp.addEventListener('submit', e=>{
    createList(e);
  });
  todolist.addEventListener('click', e=>{
    if(e.target.parentNode.className=='delete-todo'){
      deleteList(e);
    }
  });
}

//main
let isFolderCreating=false;
let currentFolderIndex=0;
let data=[];

displayFolder();
displayList();
setEventListeners();


