document.addEventListener("click", (img) => {
  if (img.target.classList.contains("img-beer")) {
    const src = img.target.getAttribute("src");
    document.querySelector(".modal-img").src = src;
    const myModal = new bootstrap.Modal(document.getElementById("beer-modal"));
    myModal.show();
  }
});

document.addEventListener("click", (img) => {
  if (img.target.classList.contains("img-comment-post")) {
    const src = img.target.getAttribute("src");
    document.querySelector(".modal-img-comment").src = src;
    const myModal = new bootstrap.Modal(
      document.getElementById("beer-modal-comment")
    );
    myModal.show();
  }
});
