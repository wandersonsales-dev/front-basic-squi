function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

const setVisibility = (id) => {
  const container = document.getElementById(`info-${id}`);
  const visible = 'infos display-flex justify-content-center align-items-center';
  const invisible = 'infos display-none justify-content-center align-items-center';

  container.className = container.className === visible ? invisible : visible;
}

let data;

document.addEventListener("DOMContentLoaded", async function () {
  document.querySelector('#load').style.display = 'flex';
  document.querySelector('#load').innerHTML = `
    <div class="loader bigger border-lilac" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
  readTextFile('./assets/data.json', function (text) {
    data = JSON.parse(text);
  });
});

window.onload = function () {
  document.querySelector('#load').style.display = 'none';
  const cards = document.getElementsByClassName('cards');

  console.log(data);

  data.forEach((item, i) => {
    const newEl = document.createElement('div');
    newEl.innerHTML = `
      <img src="${item.imagens.thumbnail.url}" />
      <a href=${item.link} target='_blank'>
        <div class="infos display-none justify-content-center align-items-center" id="info-${i}">
          <p class="text-bold">@${item.usuario.username}</p>
          <p class="text-bold"><i class="fas fa-heart"></i> ${item.upvotes}</p>
          <p class="text-bold"><i class="fas fa-comment"></i> ${item.comentarios}</p>
          <p class="text-bold">
            <i class="fas fa-calendar-alt"></i>
            ${new Date(item.criadoEm).getDay()}/${new Date(item.criadoEm).getMonth()}/${new Date(item.criadoEm).getFullYear()} ${new Date(item.criadoEm).getHours()}:${new Date(item.criadoEm).getMinutes()}
          </p>
        </div>
      </a>
    `;
    newEl.onmouseover = () => setVisibility(i);
    newEl.onmouseout = () => setVisibility(i);
    newEl.className = 'card-feed';

    cards[0].appendChild(newEl);
  })
};