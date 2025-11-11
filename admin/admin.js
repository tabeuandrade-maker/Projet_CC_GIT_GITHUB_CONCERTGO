document.addEventListener("DOMContentLoaded", () => {
  // Suppression d’un concert dans le tableau
  function attachDeleteButtons() {
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
      if (!btn.dataset.bound) {
        btn.dataset.bound = "yes";
        btn.addEventListener("click", (e) => {
          e.target.closest("tr").remove();
          updateStats();
          alert("Concert supprimé !");
        });
      }
    });
  }

  function updateStats() {
    const rows = document.querySelectorAll("#concertTable tr").length;
    document.getElementById("nbConcerts").textContent = rows;
    // Simulated values for demo:
    const billets = Math.floor(rows * 15); // exemple
    document.getElementById("nbBillets").textContent = billets;
    // revenus estimate: sum of prices in table
    let sum = 0;
    document.querySelectorAll("#concertTable tr").forEach(tr => {
      const price = parseFloat(tr.cells[3].textContent) || 0;
      sum += price * 10; // assumption 10 billets vendus par concert
    });
    document.getElementById("revenus").textContent = sum.toLocaleString('fr-FR') + " €";
  }

  attachDeleteButtons();
  updateStats();

  // Ajout d’un concert depuis la page ajouter.html
  const form = document.getElementById("formAjout");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nom = document.getElementById("nom").value;
      const ville = document.getElementById("ville").value;
      const date = document.getElementById("date").value;
      const prix = document.getElementById("prix").value;
      // For demo: store in localStorage so dashboard can read it
      const stored = JSON.parse(localStorage.getItem('concerts') || '[]');
      stored.push({nom, ville, date, prix});
      localStorage.setItem('concerts', JSON.stringify(stored));
      alert(`Concert ajouté : ${nom} à ${ville} (${prix} €)`);
      form.reset();
      window.location.href = 'dashboard.html';
    });
  }

  // If dashboard, load from localStorage into table
  const concertTable = document.getElementById("concertTable");
  if (concertTable) {
    const stored = JSON.parse(localStorage.getItem('concerts') || '[]');
    stored.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${c.nom}</td><td>${c.ville}</td><td>${c.date}</td><td>${c.prix}</td><td><button class="delete-btn">Supprimer</button></td>`;
      concertTable.appendChild(tr);
    });
    attachDeleteButtons();
    updateStats();
  }
});
