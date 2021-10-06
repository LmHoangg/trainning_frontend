const postsList = document.querySelector(".posts-list");
const url = "https://jsonplaceholder.typicode.com/posts";
const formPost = document.querySelector(".add-post-form");
const titleValue = document.querySelector("#title-value");
const bodyValue = document.querySelector("#body-value");
const btnSubmit = document.querySelector(".btn-submit");
const container = document.querySelector(".container");
const showPost = document.querySelector(".show-detail");
let itemPost = "";
let postDetail = "";
const renderPost = (posts) => {
    posts.forEach((post) => {
        itemPost += `<div class="card col-md-12 col-lg-12 row mb-3 mt-3">
                <div class="card-body" data-id=${post.id}>
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="btn btn-primary" id="edit-post">Edit</a>
                    <a href="#" class="btn btn-danger" id="delete-post">Delete</a>
                    <a href="#" class="btn btn-success" id="show-post">Show</a>
                </div>
            </div>`;
    });
    postsList.innerHTML = itemPost;
};
const renderDetailPost = (post) => {
    postDetail += ` <h5>Detail post
            <i class="fas fa-times-circle close-post"></i>
        </h5><div class="card">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text ">${post.body}</p>
            </div>
        </div>`;
    showPost.innerHTML = postDetail;
}
fetch(url)
    .then((response) => response.json())
    .then((data) => renderPost(data))
postsList.addEventListener("click", function(e) {
    e.preventDefault();
    let delIsPressed = e.target.id === "delete-post";
    let editIsPressed = e.target.id === "edit-post";
    let showIsPressed = e.target.id === "show-post";
    let id = e.target.parentElement.dataset.id;
    console.log(id);
    if (delIsPressed) {
        fetch(`${url}/${id}`, {
                method: 'DELETE',
            }).then(response => response.json())
            .then(() => location.reload());
    }
    if (editIsPressed) {
        const titleContent = e.target.previousElementSibling;
        const bodyContent = e.target.previousElementSibling.previousElementSibling;
        titleValue.value = titleContent.textContent;
        bodyValue.value = bodyContent.textContent;
    }
    if (showIsPressed) {
        container.classList.add("isHide");
        showPost.classList.add("isShow");
        fetch(`${url}/${id}`)
            .then((response) => response.json())
            .then((data) => renderDetailPost(data));
    }
    btnSubmit.addEventListener("click", function(e1) {
        e1.preventDefault();
        fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: titleValue.value,
                    body: bodyValue.value
                })
            }).then(response => response.json())
            .then(() => location.reload());
    })
})
formPost.addEventListener("submit", function(e) {
    e.preventDefault();
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleValue.value,
                body: bodyValue.value
            })
        })
        .then(response => response.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data)
            renderPost(dataArr);
        })
    titleValue.value = '';
    bodyValue.value = '';
})
const close = document.querySelector(".close-post");
close.addEventListener("click", function(e) {
    container.classList.remove("isHide");
    showPost.classList.remove("isShow");
});