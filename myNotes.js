    
const addButton = document.getElementById('add-note');
const container = document.getElementById('container');
let nextId = 0;

function initializeNewNote(){
    nextId++;
    addNoteToHTML(nextId);
    initializeDelButtons();
    keyUpActions();
}

function keyUpActions() {
    let titles = document.querySelectorAll('.title');
    titles.forEach(title => title.addEventListener('keyup', saveObjToStorage));
    let contents = document.querySelectorAll('.content');
    contents.forEach(content => content.addEventListener('keyup', saveObjToStorage));
}

function saveObjToStorage(e) {
    let title = e.target.parentNode.childNodes[3].value;
    let content = e.target.parentNode.childNodes[5].value;
    let element = e.target.parentNode;
    let key = element.id;
    localStorage.setItem(key, JSON.stringify({
        'title': title,
        'content': content,
    }));
}

function loadObjFromStorage() {
    // localStorage.clear();
    let arrayId = [];
    if (localStorage.length !== 0){
        let numberOfNotes = localStorage.length;
        for (let i = 0; i < numberOfNotes; i++){
            let id = parseInt(localStorage.key(i));
            arrayId.push(id);
            nextId = Math.max(...arrayId);
            const objectNote = JSON.parse(localStorage.getItem(arrayId[i]));
            addNoteToHTML(id); 
            let note = document.getElementById(arrayId[i]);
            let title = note.childNodes[3];
            title.value = objectNote.title;
            let content = note.childNodes[5];
            content.value = objectNote.content;
            initializeDelButtons();
            keyUpActions();
        }
    }
}

function deleteNote(e){
    const delNote = e.target.parentNode;
    const idNote = delNote.id;
    localStorage.removeItem(idNote);
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

function main() {
    loadObjFromStorage();
    addButton.addEventListener('click', initializeNewNote);

}

main();

