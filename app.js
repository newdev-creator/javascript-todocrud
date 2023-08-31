const movies = [
  {
    title: "Interstellar",
    year: 2014,
  },
  {
    title: "John Wick",
    year: 2014,
  },
  {
    title: "John Wick 2",
    year: 2017,
  },
  {
    title: "John Wick 3",
    year: 2019,
  },
  {
    title: "Parasite",
    year: 2019,
  },
];

const elApp = document.querySelector("tbody");
const elForm = document.getElementById("form");
const elContent = document.getElementById("content");

const elTitle = document.getElementById("title");
const elYear = document.getElementById("year");
const elHidden = document.getElementById("hidden");

const elFormAdd = document.getElementById("form-add");
const elFormSave = document.getElementById("form-save");
const elFormCancel = document.getElementById("form-cancel");

const elSearchInput = document.querySelector("input[type=search]");

elForm.style.display = "none";

function displayForm() {
  elForm.style.display = "block";
  elContent.style.display = "none";
}

function hideForm() {
  elForm.style.display = "none";
  elContent.style.display = "block";
  elTitle.value = "";
  elYear.value = "";
  elHidden.value = "";
}

function editMovie(index) {
  const movie = movies[index];
  elTitle.value = movie.title;
  elYear.value = movie.year;
  elHidden.value = index;
  displayForm();
}

function deleteMovie(index) {
  if (confirm("Confirmez-vous la suppression de ce film ?")) {
    movies.splice(index, 1);
    fetchAllMovies(movies);
  }
}

function fetchAllMovies(movies) {
  elApp.innerHTML = "";

  if (movies.length === 0) {
    elApp.innerHTML = "<p>Aucune ligne trouvée</p>";
    return;
  }

  let data = "";
  movies.forEach((m, index) => {
    data += `<tr>
      <td>${m.title}</td>
      <td>${m.year}</td>
      <td>
        <button class="edit btn btn-sm btn-outline-success" value="${index}">
          Modifier
        </button>
        <button class="delete btn btn-sm btn-outline-danger" value="${index}">
          Supprimer
        </button>
      </td>
    </tr>`;
  });

  elApp.innerHTML = data;

  document.querySelectorAll("button.edit").forEach((b) => {
    b.addEventListener("click", function () {
      editMovie(this.value);
    });
  });

  document.querySelectorAll("button.delete").forEach((b) => {
    b.addEventListener("click", function () {
      deleteMovie(this.value);
    });
  });
}

function search() {
  const filteredData = movies.filter((movie) =>
    movie.title.toLowerCase().includes(elSearchInput.value.toLowerCase())
  );
  fetchAllMovies(filteredData);
}

elFormAdd.addEventListener("click", displayForm);

elFormSave.addEventListener("click", function () {
  const title = elTitle.value;
  const year = elYear.value;

  if (title && year) {
    const movie = { title, year };

    if (elHidden.value.length > 0) {
      movies.splice(elHidden.value, 1, movie);
    } else {
      movies.push(movie);
    }

    hideForm();
    console.table(movies);
    fetchAllMovies(movies);
  }
});

elFormCancel.addEventListener("click", hideForm);

elSearchInput.addEventListener("input", search);

console.table(movies);
fetchAllMovies(movies);
