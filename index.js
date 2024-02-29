const baseUrl = "https://api.pexels.com/v1/search?query=";

const loadBtn = document.querySelector(".loadBtn");
const loadSBtn = document.querySelector(".loadSBtn");
const edit = document.querySelectorAll(".btnEdit");
const searchBtn = document.querySelector(".searchBtn");
const input = document.querySelector("#textInput");

const cancella = (e) => {
  const parent = e.closest(".card");
  parent.classList.add("d-none");
};

edit.forEach((e) => {
  e.innerText = "Hide";
  e.addEventListener("click", () => cancella(e));
});

const handleLoad = (url) => {
  const totalUrl = baseUrl + url;

  fetch(totalUrl, {
    headers: {
      Authorization: "bZ5zruQHRA4utiliCefzqsSyewNqxaAYGJIJB407GlGJMSgM7u8tRNPX",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Padre non trovato");
      }
    })
    .then((x) => {
      for (let i = 0; i < x.photos.length; i++) {
        const SRC = x.photos[i].src;
        const img = document.querySelectorAll("img");

        img[i].src = SRC.original;
        console.log(SRC.original);

        const id = x.photos[i].id;
        const small = document.querySelectorAll(".text-muted");
        small[i].innerText = id;
      }
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  loadBtn.addEventListener("click", () => handleLoad("cat"));
  loadSBtn.addEventListener("click", () => handleLoad("turtle"));
  searchBtn.addEventListener("click", () => handleLoad(input.value));
};
