console.log("script.js connected");

async function loadBooks() {
  console.log("loadBooks() called");

  try {
    const res = await fetch("http://localhost:3000/books");
    console.log("Response status:", res.status);

    const books = await res.json();
    console.log("Books received:", books);

    const tableBody = document.getElementById("bookTableBody");
    tableBody.innerHTML = "";

    if (!books || books.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5">No books found</td>
        </tr>
      `;
      return;
    }

    books.forEach(book => {
      tableBody.innerHTML += `
        <tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.category}</td>
          <td>${book.publishedYear}</td>
          <td>${book.availableCopies}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("ERROR fetching books:", error);
  }
}

window.onload = loadBooks;
