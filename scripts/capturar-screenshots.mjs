// Gera screenshots reais dos projetos públicos.
//
// Como usar (no seu computador, dentro da pasta do portfólio):
//   npm init -y
//   npm i -D playwright
//   npx playwright install chromium
//   node scripts/capturar-screenshots.mjs
//
// As imagens vão para assets/projetos/ com os nomes que o HTML já espera.
// Importante: capture apenas páginas públicas. No FlipPrime, use a página
// de entrada, nunca uma tela logada com dados de clientes.

import { chromium } from "playwright";

const projetos = [
  { arquivo: "flipprime", url: "https://flipprime.vercel.app/" },
  { arquivo: "jacylash", url: "https://jacylash.vercel.app/" },
  { arquivo: "alura-plus", url: "https://alura-plus-virid-nine.vercel.app/" },
];

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1440, height: 900 } });

for (const { arquivo, url } of projetos) {
  await pagina.goto(url, { waitUntil: "networkidle" });
  await pagina.waitForTimeout(800); // deixa animações de entrada terminarem
  await pagina.screenshot({ path: `assets/projetos/${arquivo}.png` });
  console.log(`ok: ${arquivo}.png`);
}

await navegador.close();
