// logic.js — script do portfólio. Faz só duas coisas, de propósito:
// 1) preenche o ano do rodapé;
// 2) mostra um fallback elegante se a imagem de um projeto ainda não existir.

// 1. Ano do rodapé
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// 2. Imagens ausentes
// A imagem pode falhar antes deste script rodar, então checamos os dois casos:
// já terminou com erro (complete + naturalWidth 0) ou vai falhar depois (evento "error").
document.querySelectorAll(".card__media img").forEach((img) => {
  const marcarAusente = () => img.parentElement.classList.add("is-missing");

  if (img.complete && img.naturalWidth === 0) {
    marcarAusente();
  } else {
    img.addEventListener("error", marcarAusente, { once: true });
  }
});
