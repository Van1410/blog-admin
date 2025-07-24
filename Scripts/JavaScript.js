

// DOM 
$(function () {
  console.log("Blog Admin JS Loaded");

  // Load posts from external JSON file
  async function loadPosts() {
    try {
      const response = await fetch("https://van1410.github.io/blog-data/posts.json");
      const data = await response.json();
      displayPosts(data.posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  }

  // Display blog posts 
  function displayPosts(posts) {
    const container = $("#post-container");
    container.empty();
    posts.forEach((post, index) => {
      container.append(`
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.post}</p>
            <p class="card-text"><small class="text-muted">${post.datePosted}</small></p>
          </div>
        </div>
      `);
    });
  }

  // Filter blog post
  $("#searchInput").on("input", function () {
    const searchTerm = $(this).val().toLowerCase();
    $("#post-container .card").each(function () {
      const title = $(this).find(".card-title").text().toLowerCase();
      $(this).toggle(title.includes(searchTerm));
    });
  });

  // Add new blog post 
  $("#addPostForm").on("submit", function (e) {
    e.preventDefault();
    const title = $("#newTitle").val();
    const content = $("#newContent").val();
    const date = new Date().toISOString().split("T")[0];

    if (title && content) {
      const newPost = `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${content}</p>
            <p class="card-text"><small class="text-muted">${date}</small></p>
          </div>
        </div>
      `;
      $("#post-container").prepend(newPost);

      //  toast
      const toast = new bootstrap.Toast(document.getElementById('postToast'));
      toast.show();

      // reset form
      $("#addPostModal").modal("hide");
      this.reset();
    }
  });

  
  loadPosts();
});
