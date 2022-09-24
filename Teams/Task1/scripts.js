function createPost() {
    let inputPost = document.getElementById('input');
    let post = inputPost.value;
    let book = document.getElementById('book');
    let newParagraph = document.createElement('p');
    book.append(newParagraph);
    newParagraph.innerHTML = post;
    inputPost.value = '';
}

function deletePost() {
    let book = document.getElementById('book');
    let paragraphs = book.getElementsByTagName('p');
    book.removeChild(paragraphs[paragraphs.length - 1]);
}

function deleteAllPosts() {
    let book = document.getElementById('book');
    book.innerHTML = '';
}