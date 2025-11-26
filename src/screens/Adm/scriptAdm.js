document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const cards = Array.from(document.querySelectorAll(".servico-card"));
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const carousel = document.querySelector(".carousel");

  let index = 0;
  let autoSlide;
  const interval = 20; 
  const step = 0.8;  
  const cardsPerView = 3;

  cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  const allCards = document.querySelectorAll(".servico-card");

  function updateCarousel(animate = true) {
    const cardWidth = allCards[0].offsetWidth + 20; 
    const moveX = index;

    if (animate) {
      track.style.transition = "transform 0.05s linear";
    } else {
      track.style.transition = "none";
    }

    track.style.transform = `translateX(${-moveX}px)`;

    if (index >= cardWidth * cards.length) {
      index = 0;
      updateCarousel(false);
    }
  }

  function nextSlide() {
    const cardWidth = allCards[0].offsetWidth + 20;
    index += cardWidth;
    updateCarousel();
  }

  function prevSlide() {
    const cardWidth = allCards[0].offsetWidth + 20;
    if (index === 0) {
      index = cardWidth * cards.length;
      updateCarousel(false);
    }
    index -= cardWidth;
    updateCarousel();
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      index += step;
      updateCarousel();
    }, interval);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  track.addEventListener("mouseenter", stopAutoSlide);
  track.addEventListener("mouseleave", startAutoSlide);

  updateCarousel(false);
  startAutoSlide();
});

// ========== EDIÇÃO DO RODAPÉ ==========

function criarModalEdicao() {
  const modal = document.createElement("div");
  modal.id = "modal-editar-footer";
  modal.innerHTML = `
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <h3>Editar informações do rodapé</h3>
    <label>Nome da Empresa:</label>
    <input type="text" id="empresa-nome">

    <label>CNPJ:</label>
    <input type="text" id="empresa-cnpj">

    <label>Email:</label>
    <input type="email" id="empresa-email">

    <label>Telefone:</label>
    <input type="text" id="empresa-telefone">

    <label>GitHub (URL):</label>
    <input type="url" id="link-github">

    <label>Instagram (URL):</label>
    <input type="url" id="link-instagram">

    <label>LinkedIn (URL):</label>
    <input type="url" id="link-linkedin">

    <div class="modal-buttons">
      <button id="salvar-footer">Salvar</button>
      <button id="cancelar-footer">Cancelar</button>
    </div>
  </div>
  `;
  document.body.appendChild(modal);
  carregarDadosExistentes();
  ativarEventosModal();
}

// Preenche o modal com os dados atuais do rodapé
function carregarDadosExistentes() {
  document.getElementById("empresa-nome").value =
    document.querySelector(".footer-left .footer-section:nth-child(1) p:nth-child(2)").innerText;
  document.getElementById("empresa-cnpj").value =
    document.querySelector(".footer-left .footer-section:nth-child(1) p:nth-child(3)").innerText.replace("CNPJ ", "");
  document.getElementById("empresa-email").value =
    document.querySelector(".footer-left .footer-section:nth-child(2) a").innerText;
  document.getElementById("empresa-telefone").value =
    document.querySelector(".footer-left .footer-section:nth-child(2) p:nth-child(3) a").innerText;

  document.getElementById("link-github").value =
    document.querySelector('.footer-social a:nth-child(1)').href;
  document.getElementById("link-instagram").value =
    document.querySelector('.footer-social a:nth-child(2)').href;
  document.getElementById("link-linkedin").value =
    document.querySelector('.footer-social a:nth-child(3)').href;
}

function ativarEventosModal() {
  document.getElementById("cancelar-footer").addEventListener("click", fecharModal);
  document.querySelector(".modal-overlay").addEventListener("click", fecharModal);

  document.getElementById("salvar-footer").addEventListener("click", () => {
    const nome = document.getElementById("empresa-nome").value.trim();
    const cnpj = document.getElementById("empresa-cnpj").value.trim();
    const email = document.getElementById("empresa-email").value.trim();
    const telefone = document.getElementById("empresa-telefone").value.trim();
    const github = document.getElementById("link-github").value.trim();
    const insta = document.getElementById("link-instagram").value.trim();
    const linkedin = document.getElementById("link-linkedin").value.trim();

    // Atualiza o conteúdo do rodapé
    document.querySelector(".footer-left .footer-section:nth-child(1) p:nth-child(2)").innerText = nome;
    document.querySelector(".footer-left .footer-section:nth-child(1) p:nth-child(3)").innerText = `CNPJ ${cnpj}`;
    document.querySelector(".footer-left .footer-section:nth-child(2) a").innerText = email;
    document.querySelector(".footer-left .footer-section:nth-child(2) a").href = `mailto:${email}`;
    document.querySelector(".footer-left .footer-section:nth-child(2) p:nth-child(3) a").innerText = telefone;
    document.querySelector(".footer-left .footer-section:nth-child(2) p:nth-child(3) a").href = `tel:+55${telefone.replace(/\D/g, "")}`;
    document.querySelector('.footer-social a:nth-child(1)').href = github;
    document.querySelector('.footer-social a:nth-child(2)').href = insta;
    document.querySelector('.footer-social a:nth-child(3)').href = linkedin;

    // Salva no localStorage
    const dados = { nome, cnpj, email, telefone, github, insta, linkedin };
    localStorage.setItem("footerData", JSON.stringify(dados));

    fecharModal();
  });
}

function fecharModal() {
  const modal = document.getElementById("modal-editar-footer");
  if (modal) modal.remove();
}

function carregarFooterSalvo() {
  const salvo = localStorage.getItem("footerData");
  if (!salvo) return;
  const dados = JSON.parse(salvo);

  document.querySelector(".footer-left .footer-section:nth-child(1) p:nth-child(2)").innerText = dados.nome;
  document.querySelector(".footer-left .footer-section:nth-child(1) p:nth-child(3)").innerText = `CNPJ ${dados.cnpj}`;
  document.querySelector(".footer-left .footer-section:nth-child(2) a").innerText = dados.email;
  document.querySelector(".footer-left .footer-section:nth-child(2) a").href = `mailto:${dados.email}`;
  document.querySelector(".footer-left .footer-section:nth-child(2) p:nth-child(3) a").innerText = dados.telefone;
  document.querySelector(".footer-left .footer-section:nth-child(2) p:nth-child(3) a").href = `tel:+55${dados.telefone.replace(/\D/g, "")}`;
  document.querySelector('.footer-social a:nth-child(1)').href = dados.github;
  document.querySelector('.footer-social a:nth-child(2)').href = dados.insta;
  document.querySelector('.footer-social a:nth-child(3)').href = dados.linkedin;
}

document.addEventListener("DOMContentLoaded", () => {
  carregarFooterSalvo();
  const botaoEditar = document.querySelector(".footer-btn button");
  if (botaoEditar) botaoEditar.addEventListener("click", criarModalEdicao);
});


// ======= ESTILOS DO MODAL  =======
const estiloModal = document.createElement("style");
estiloModal.textContent = `
#modal-editar-footer {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  font-family: "Poppins", sans-serif;
}
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
}
.modal-content {
  position: relative;
  background: #0f181b;
  padding: 30px 40px;
  border-radius: 10px;
  width: 800px;
  color: #ddd;
  z-index: 10;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}
.modal-content h3 {
  margin-bottom: 8%;
  color: #ffffffff;
  text-align: center;
}
.modal-content label {
  display: block;
  font-size: 14px;
  margin-bottom: 1%;
  color: #dddcdcff;
}
.modal-content input {
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 3%;
  border: none;
  border-radius: 6px;
  background: #1b2a2f;
  color: #bebebe;
  outline: none;
}
.modal-content input:focus {
  outline: 2px solid #ff6600ff;
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
}
.modal-buttons button {
  background: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  cursor: pointer;
  transition: 0.3s;
}
.modal-buttons button:hover {
  background: #ff6600ff;
}
`;
document.head.appendChild(estiloModal);


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
});