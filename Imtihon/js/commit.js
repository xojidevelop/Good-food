const test2 = function(){

    let elCommitTemplate = document.querySelector("#commit-template").content;



let newCommitFragment = document.createDocumentFragment();

function renderCommit(obj) {
    let elCommit = elCommitTemplate.cloneNode(true);

    elCommit.querySelector(".js-commit__id").textContent = `${obj.postId}`;
    elCommit.querySelector(".js-commit__title").textContent = `${obj.name}`;
    elCommit.querySelector(".js-commit__email").href = `${obj.email}`;
    elCommit.querySelector(".js-commit__email").textContent = `${obj.email}`;
    elCommit.querySelector(".js-commit__body").textContent = `${obj.body}`;
    

    newCommitFragment.appendChild(elCommit);
}

function eachCommit(array) {
    array.forEach((obj) => {
        if(obj.postId == idPost)
        renderCommit(obj);
    });

    elCommitList.appendChild(newCommitFragment);



    
}

fetch(`https://jsonplaceholder.typicode.com/comments`)
        .then((res) => res.json())
        .then((data) => eachCommit(data));
}