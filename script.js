document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const concert = params.get("concert");
  const prix = parseFloat(params.get("prix") || 0);
  if (concert) document.getElementById("concert").value = concert;
  if (prix) document.getElementById("prix").value = prix;

  const quantiteInput = document.getElementById("quantite");
  const totalSpan = document.getElementById("total");

  function updateTotal() {
    const qte = parseInt(quantiteInput.value || 1);
    totalSpan.textContent = (prix * qte).toFixed(2);
  }

  quantiteInput.addEventListener("input", updateTotal);
  updateTotal();

  const form = document.getElementById("formAchat");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nom = document.getElementById("nom").value;
      const total = totalSpan.textContent;
      window.location.href =
        `confirmation.html?nom=${encodeURIComponent(nom)}&concert=${encodeURIComponent(concert)}&total=${total}`;
    });
  }
});