let idStocked;
function openModal(id) {
  document.getElementById(id).classList.add("active");
  if (idStocked) {
    document.getElementById(idStocked).classList.remove("active");
  }
  idStocked = id;
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

function updatePreview() {
  const code = document.getElementById("codeArea").value;
  const iframe = document.getElementById("preview");
  const userDescription = document.getElementById("user-description");
  const userSite = document.querySelector(".user-site");

  iframe.srcdoc = code;
  let score = 100;

  if (code.includes('<meta name="description"')) {
    score += 10;
    userDescription.textContent = "Description : Présente";
  } else {
    userDescription.textContent = "(Description non définie)";
  }

  if (code.includes("alt=")) {
    score += 10;
    document.querySelector(".practice-item-2").innerHTML =
      "✅ Attribut alt pour les images détecté.";
  }
  if (code.includes("<title>") && !code.includes("<title></title>")) score += 5;
  if (code.includes("<h1>")) score += 5;
  if (code.includes('<meta name="viewport"')) score += 5;

  userSite.setAttribute("data-score", score);
  updateRanking();

  // if (score >= 120) {
  //   alert("🎉 Félicitations ! Votre site est en tête du classement SEO !");
  // }
}

function updateRanking() {
  const rankingList = document.getElementById("rankingList");
  const items = Array.from(rankingList.children);

  items.sort((a, b) => parseInt(b.dataset.score) - parseInt(a.dataset.score));
  items.forEach((item) => rankingList.appendChild(item));
}

window.onload = updatePreview;
