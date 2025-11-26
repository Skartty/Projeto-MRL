// =====================
// ABAS
// =====================
const buttons = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".tab-content");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// =====================
// POP-UP
// =====================
function criarPopup(mensagem, duracao = 0) {
  const popup = document.createElement("div");
  popup.className = "popup-overlay";
  popup.innerHTML = `
    <div class="popup-box">
      <p>${mensagem}</p>
      <button id="popup-ok">OK</button>
    </div>
  `;
  document.body.appendChild(popup);

  const botaoOk = popup.querySelector("#popup-ok");
  botaoOk.addEventListener("click", () => popup.remove());

  if (duracao > 0) {
    setTimeout(() => popup.remove(), duracao);
  }
}

// =====================
// SAIR DA CONTA
// =====================
document.addEventListener("DOMContentLoaded", () => {
  async function criarPopup(mensagem, duracao = 0) {
    const popup = document.createElement("div");
    popup.className = "popup-overlay";
    popup.innerHTML = `
      <div class="popup-box">
        <p>${mensagem}</p>
        <button id="popup-ok">OK</button>
      </div>
    `;
    document.body.appendChild(popup);

    const botaoOk = popup.querySelector("#popup-ok");
    botaoOk.addEventListener("click", () => popup.remove());
    await signOut(auth);

    if (duracao > 0) {
      setTimeout(() => popup.remove(), duracao);
    }
  }
  
  const btnSair = document.querySelector(".btn-home");
  if (btnSair) {
    btnSair.addEventListener("click", (e) => {
      e.preventDefault();
      criarPopup("Você saiu da conta com sucesso!");

      const popup = document.querySelector(".popup-overlay");
      popup.querySelector("#popup-ok").addEventListener("click", () => {
        window.location.href = "/screens/Home/index.html";
      });
    });
  }

  // =====================
  // POP-UP: CONTRATOS (Download bloqueado)
  // =====================
  document.querySelectorAll(".btn-download").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      criarPopup("Ainda não é possível realizar o download do contrato, pois o site está em desenvolvimento.");
    });
  });

  // =====================
  // POP-UP: PAGAMENTOS (Recibo bloqueado)
  // =====================
  document.querySelectorAll(".btn-recibo").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      criarPopup("Ainda não é possível realizar o download do recibo, pois o site está em desenvolvimento.");
    });
  });

  // =====================
  // POP-UP: AVALIAÇÕES (Edição bloqueada)
  // =====================
  document.querySelectorAll(".icone-olho img").forEach(icone => {
    icone.addEventListener("click", (e) => {
      e.preventDefault();
      criarPopup("Ainda não é possível editar as avaliações visíveis do site, pois o site está em desenvolvimento.");
    });
  });

  // =====================
  // POP-UP: SERVIÇOS (Edição/Remoção/Adição bloqueadas)
  // =====================
  document.querySelectorAll("#servicos button").forEach(botao => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      criarPopup("A edição, remoção ou adição de serviços ainda não está disponível, pois o site está em desenvolvimento.");
    });
  });

  // =====================
  // POP-UP: CARROSSEL (Edição bloqueada)
  // =====================
  document.querySelectorAll("#carrossel button").forEach(botao => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      criarPopup("A edição do carrossel ainda não está disponível, pois o site está em desenvolvimento.");
    });
  });
});
