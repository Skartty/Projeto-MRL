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

  // loop infinito
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

  // Avançar
  function nextSlide() {
    const cardWidth = allCards[0].offsetWidth + 20;
    index += cardWidth;
    updateCarousel();
  }

  // Voltar
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

// === POPUPS ===
document.addEventListener("DOMContentLoaded", () => {

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
  // === SAIR DA CONTA ===
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

  // === ENVIAR AVALIAÇÃO ===
  const formAvaliacao = document.querySelector(".avaliacao-form");
  if (formAvaliacao) {
    formAvaliacao.addEventListener("submit", (e) => {
      e.preventDefault();

      const estrelas = formAvaliacao.querySelector('input[name="estrela"]:checked');
      const servico = formAvaliacao.querySelector("#servico").value;

      if (!estrelas) {
        criarPopup("Por favor, selecione uma quantidade de estrelas antes de enviar!");
        return;
      }

      if (!servico) {
        criarPopup("Por favor, selecione um serviço antes de enviar!");
        return;
      }

      criarPopup("✅ Avaliação enviada com sucesso! Obrigado por compartilhar sua opinião.");
      formAvaliacao.reset();
    });
  }
});

