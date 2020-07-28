    
const addButton = document.getElementById('add-note');
const container = document.getElementById('container');
let nextId = 0;

function initializeNewNote(){
    nextId++;
    addNoteToHTML(nextId);
    initializeDelButtons();
    saveEmptyNote(nextId);
    keyUpActions();
}

function saveEmptyNote(id){
    let noteObj = {
        'id': id,
        'title': "Edit title",
        'content': "Your note...",
    }
    let notesArray = JSON.parse(localStorage.getItem('myNotes'));
    notesArray.push(noteObj);
    localStorage.setItem('myNotes', JSON.stringify(notesArray));
}

function keyUpActions() {
    let titles = document.querySelectorAll('.title');
    titles.forEach(title => title.addEventListener('input', saveObjToStorage));
    let contents = document.querySelectorAll('.content');
    contents.forEach(content => content.addEventListener('input', saveObjToStorage));
}

function saveObjToStorage(e) {
    let title = e.target.parentNode.childNodes[3].value;
    let content = e.target.parentNode.childNodes[5].value;
    let noteId = e.target.parentNode.id;    
    let notesArray = JSON.parse(localStorage.getItem('myNotes'));

    for (let i = 0; i < notesArray.length; i++){
        if (notesArray[i].id == noteId){
            notesArray[i].title = title;
            notesArray[i].content = content;
            localStorage.setItem('myNotes', JSON.stringify(notesArray));
        }        
    }
}

function loadObjFromStorage() {
    let arrayId = [];
    if (localStorage['myNotes']){
        let notes = JSON.parse(localStorage.getItem('myNotes'));
        let numberOfNotes = notes.length;
        console.log(numberOfNotes);
        for (let i = 0; i < numberOfNotes; i++){
            let id = notes[i].id;
            arrayId.push(parseInt(id));
            nextId = Math.max(...arrayId);
            addNoteToHTML(id); 
            let note = document.getElementById(arrayId[i]);
            let title = note.childNodes[3];
            title.value = notes[i].title;
            let content = note.childNodes[5];
            content.value = notes[i].content;
            initializeDelButtons();
            keyUpActions();
        }
        
    }

}

function deleteNote(e){
    const delNote = e.target.parentNode;
    const idNote = delNote.id;
    let notes = JSON.parse(localStorage.getItem("myNotes"));
    for (let i = 0; i < notes.length; i++){
        if (notes[i].id == idNote){
            notes.splice(i, 1);
            localStorage.setItem('myNotes', JSON.stringify(notes));
        }
    }
    delNote.remove();
}

function saveToHTML(e){
    let title = e.target.value;
    e.target.setAttribute('value', title);
}

function addNoteToHTML(nextId){
    const createNoteHTML = createStringNote(nextId);
    document.querySelector('.container').insertAdjacentHTML('beforeend', createNoteHTML);
}

function initializeDelButtons(){
    let delButtons = document.querySelectorAll('.x');
    delButtons.forEach(x => x.addEventListener('click', deleteNote));
}

function createStringNote(id){
    return `  
    <div class="single-note" id=${id}>
        <div class="x">X</div>
        <input type="text" name="title" class='title' value="Edit title">
        <textarea name="content" class='content' cols="" rows="">Your note...</textarea>
    </div>
        `;
}

function initializeLocalStorageElement(){
    const key = 'myNotes';
    let notesArray = [];
    if (!localStorage[key]) {
        localStorage.setItem(key, JSON.stringify(notesArray));
    }
}

function main() {
    initializeLocalStorageElement();
    loadObjFromStorage();
    addButton.addEventListener('click', initializeNewNote);
    // dragula([container]);
}

main();
