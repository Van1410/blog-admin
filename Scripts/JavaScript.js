// JSON blog data URL
const blogDataUrl = "https://van1410.github.io/blog-data/posts.json";

let posts = [];

// Render posts to page
function renderPosts() {
  const container = $("#posts-list");
  container.empty();

  posts.forEach((post, index) => {
    const postHtml = $(`
      <div class="card mb-4">
        <div class="card-body">
          <input type="text" class="form-control mb-2" value="${post.title}" data-index="${index}" data-field="title" />
          <textarea class="form-control mb-2" rows="3" data-index="${index}" data-field="post">${post.post}</textarea>
          <input type="date" class="form-control mb-2" value="${post.datePosted}" data-index="${index}" data-field="datePosted" />
          <button class="btn btn-success save-btn" data-index="${index}">Save</button>
        </div>
      </div>
    `);
    container.append(postHtml);
  });
}

// Fetch blog posts
function fetchPosts() {
  $.getJSON(blogDataUrl)
    .done((data) => {
      posts = data.posts;
      renderPosts();
    })
    .fail(() => {
      alert("Failed to load blog posts.");
    });
}

// Save 
function savePost(index) {
  const card = $(`.save-btn[data-index=${index}]`).closest(".card-body");
  const title = card.find("input[data-field=title]").val();
  const post = card.find("textarea[data-field=post]").val();
  const datePosted = card.find("input[data-field=datePosted]").val();

  posts[index] = { title, post, datePosted };
  alert(`Post ${index + 1} saved (temporarily in memory).`);
}


$("#new-post-form").on("submit", function (e) {
  e.preventDefault();
  const newPost = {
    title: $("#post-title").val(),
    post: $("#post-content").val(),
    datePosted: $("#post-date").val(),
  };

  posts.unshift(newPost);
  renderPosts();
  this.reset();
  alert("New post added (temporarily in memory).");
});

// Save button click
$("#posts-list").on("click", ".save-btn", function () {
  const index = $(this).data("index");
  savePost(index);
});

// Load posts on page ready
$(document).ready(() => {
  fetchPosts();
});
