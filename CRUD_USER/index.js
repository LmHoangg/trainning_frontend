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
const renderPosts = (posts) => {
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
const renderPost = (post) => {
  postsList.innerHTML += `<div class="card col-md-12 col-lg-12 row mb-3 mt-3">
    <div class="card-body" data-id=${post.id}>
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.body}</p>
        <a href="#" class="btn btn-primary" id="edit-post">Edit</a>
        <a href="#" class="btn btn-danger" id="delete-post">Delete</a>
        <a href="#" class="btn btn-success" id="show-post">Show</a>
    </div>
    </div>`;
};
const renderDetailPost = (post) => {
  postDetail += `<div class="show-detail-title">
            <h5>Detail post</h5>
            <span class="fas fa-times-circle close-post" aria-hidden="true" id="Close"></span>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body}</p>
            </div>
        </div>`;
  showPost.innerHTML = postDetail;
};
fetch(url)
  .then((response) => response.json())
  .then((data) => renderPosts(data));
postsList.addEventListener("click", function (e) {
  e.preventDefault();
  let delIsPressed = e.target.id === "delete-post";
  let editIsPressed = e.target.id === "edit-post";
  let showIsPressed = e.target.id === "show-post";
  let id = e.target.parentElement.dataset.id;

  switch (true) {
    case delIsPressed:
      fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          document.querySelector(`[data-id="${id}"]`).parentElement.remove();
        })
        .catch((error) => console.log(error.message));
      break;
    case editIsPressed:
      const bodyContent = e.target.previousElementSibling;
      const titleContent =
        e.target.previousElementSibling.previousElementSibling;
      titleValue.value = titleContent.textContent;
      bodyValue.value = bodyContent.textContent;
      btnSubmit.addEventListener("click", function (e1) {
        e1.preventDefault();
        fetch(`${url}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value,
          }),
        })
          .then((response) => response.json())
          .catch((error) => console.log(error.message));
        let post = document.querySelector(`[data-id="${id}"]`);
        post.firstElementChild.textContent = titleValue.value;
        post.firstElementChild.nextElementSibling.textContent = bodyValue.value;
        titleValue.value = "";
        bodyValue.value = "";
      });
      break;
    case showIsPressed:
      container.classList.add("isHide");
      showPost.classList.add("isShow");
      fetch(`${url}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => renderDetailPost(data))
        .catch((error) => console.log(error.message));
  }
});
formPost.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: bodyValue.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => renderPost(data));
  titleValue.value = "";
  bodyValue.value = "";
});
const closePost = document.querySelector("#Close");
closePost.addEventListener("click", function () {
  document.querySelector(".container.isHide").classList.add("isShow");
  document.querySelector(".show-detail.isShow").classList.add("isHide");
});
