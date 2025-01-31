async function fetchAlbums() {
  try {
    const response = await fetch("http://localhost:3000/albums");
    const data = await response.json();

    console.log(data); // Verifica la estructura de la respuesta

    const albums = data.albums || []; // Asumiendo que los álbumes están dentro de la propiedad 'albums'

    const tableBody = document
      .getElementById("albumsTable")
      .querySelector("tbody");

    albums.forEach((album) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                  <td>${album.title}</td>
                  <td>${album.artist}</td>
                  <td>${album.genre}</td>
                  <td>${album.releaseYear}</td>
                  <td>${album.track}</td>
              `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching album data:", error);
  }

  document.getElementById("enterBtn").addEventListener("click", function () {
    window.location.href = "albums.html"; // Redirige a la página de los álbums
  });
}

function filterAlbums() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#albumsTable tbody tr");

  rows.forEach((row) => {
    const title = row.children[1].textContent.toLowerCase();
    const artist = row.children[2].textContent.toLowerCase();
    row.style.display =
      title.includes(query) || artist.includes(query) ? "" : "none";
  });
}


// Fetch and display albums data on page load
fetchAlbums();

document.getElementById("addAlbumBtn").addEventListener("click", function () {
  const form = document.getElementById("albumForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
  form.dataset.editing = ""; // Clear editing state
});

document
  .getElementById("albumForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const artist = document.getElementById("artist").value;
    const genre = document.getElementById("genre").value;
    const year = document.getElementById("year").value;
    const track = document.getElementById("track").value;
    const youtubeLink = document.getElementById("youtubeLink").value; // Assuming you have an input for YouTube link

    const table = document
      .getElementById("albumsTable")
      .getElementsByTagName("tbody")[0];
    const form = document.getElementById("albumForm");

    if (form.dataset.editing) {
      // Update existing row
      const row = document.querySelector(
        `tr[data-id="${form.dataset.editing}"]`
      );
      row.cells[0].textContent = title;
      row.cells[1].textContent = artist;
      row.cells[2].textContent = genre;
      row.cells[3].textContent = year;
      row.cells[4].textContent = track;
      form.dataset.editing = ""; // Clear editing state
    } else {
      // Add new row
      const newRow = table.insertRow();
      newRow.dataset.id = Date.now(); // Unique ID for the row

      const titleCell = newRow.insertCell(0);
      const artistCell = newRow.insertCell(1);
      const genreCell = newRow.insertCell(2);
      const yearCell = newRow.insertCell(3);
      const trackCell = newRow.insertCell(4);
      const actionsCell = newRow.insertCell(5);

      titleCell.innerHTML = `<a href="${youtubeLink}" target="_blank">${title}</a>`;
      artistCell.textContent = artist;
      genreCell.textContent = genre;
      yearCell.textContent = year;
      trackCell.textContent = track;
      trackCell.style.color = "#40b16d"; // Apply the color to the Best Track cell

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "action-btn edit-btn";
      editBtn.addEventListener("click", function () {
        editAlbum(newRow);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "action-btn delete-btn";
      deleteBtn.addEventListener("click", function () {
        deleteAlbum(newRow);
      });

      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(deleteBtn);
    }

    document.getElementById("albumForm").reset();
    document.getElementById("albumForm").style.display = "none";
  });

  

function editAlbum(row) {
  const title = row.cells[0].textContent;
  const artist = row.cells[1].textContent;
  const genre = row.cells[2].textContent;
  const year = row.cells[3].textContent;
  const track = row.cells[4].textContent;

  document.getElementById("title").value = title;
  document.getElementById("artist").value = artist;
  document.getElementById("genre").value = genre;
  document.getElementById("year").value = year;
  document.getElementById("track").value = track;

  document.getElementById("albumForm").style.display = "block";
  document.getElementById("albumForm").dataset.editing = row.dataset.id; // Set editing state
}

function deleteAlbum(row) {
  row.remove();
}

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll("#albumsTable tbody tr");

  rows.forEach((row) => {
    const title = row.cells[0].textContent.toLowerCase();
    const artist = row.cells[1].textContent.toLowerCase();
    const genre = row.cells[2].textContent.toLowerCase();
    const year = row.cells[3].textContent.toLowerCase();
    const track = row.cells[4].textContent.toLowerCase();

    row.style.display =
      title.includes(query) ||
      artist.includes(query) ||
      genre.includes(query) ||
      year.includes(query) ||
      track.includes(query)
        ? ""
        : "none";
  });
});


