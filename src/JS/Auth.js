import { auth, provider, signInWithPopup, googleProvider } from "./firebase_config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { db } from "./firebase_config.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* ==============================
   AVISO BETA 
   ============================== */
function mostrarAvisoBeta(callback) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.7)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.5s ease"; 

  const popup = document.createElement("div");
  popup.style.background = "#fff";
  popup.style.color = "#000";
  popup.style.borderRadius = "12px";
  popup.style.padding = "30px";
  popup.style.maxWidth = "420px";
  popup.style.textAlign = "center";
  popup.style.boxShadow = "0 4px 25px rgba(0,0,0,0.4)";
  popup.style.fontFamily = "Montserrat, sans-serif";
  popup.style.transform = "scale(0.9)";
  popup.style.transition = "transform 0.3s ease, opacity 0.3s ease"; 
  popup.style.opacity = "0";

  popup.innerHTML = `
    <h2 style="margin-bottom: 10px; color: #e65c00;">🚧 Site em Desenvolvimento</h2>
    <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
      Esta é uma <strong>versão beta</strong> do sistema.<br>
      Alguns botões, menus e interações ainda estão sendo implementados.<br>
      Os elementos estáticos são apenas representações visuais do design final.
    </p>
    <button id="btnAvisoOk" style="
      background: #e65c00;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 25px;
      font-size: 15px;
      cursor: pointer;
      transition: background 0.3s, transform 0.2s;
    ">OK</button>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
    popup.style.opacity = "1";
    popup.style.transform = "scale(1)";
  });

  const btn = popup.querySelector("#btnAvisoOk");
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.05)";
    btn.style.background = "#ff7b22";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
    btn.style.background = "#e65c00";
  });

  btn.addEventListener("click", () => {
    popup.style.opacity = "0";
    popup.style.transform = "scale(0.9)";
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.remove();
      if (callback) callback();
    }, 400); 
  });
}

/* ==============================
   MONITORAMENTO DE LOGIN
   ============================== */
export function monitorarAuthRedirecionar() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(
        "👤 Usuário logado automaticamente:",
        user.email || user.displayName
      );

      try {
        const clienteRef = doc(db, "Cliente", user.uid);
        const clienteSnap = await getDoc(clienteRef);

        if (clienteSnap.exists()) {
          const cliente = clienteSnap.data();
          const currentPath = window.location.pathname;

          if (
            cliente.admin === true &&
            !currentPath.includes("/screens/Adm/")
          ) {
            console.log("🔐 Redirecionando para área de Admin...");
            
            mostrarAvisoBeta(() => {
              window.location.href = "/screens/Adm/";
            });
          } else if (
            !cliente.admin &&
            !currentPath.includes("/screens/User/")
          ) {
            console.log("👤 Redirecionando para área de Perfil...");

            mostrarAvisoBeta(() => {
              window.location.href = "/screens/User/";
            });
          }
        } else {
          console.warn(
            "⚠️ Cliente não encontrado. Redirecionando para Perfil."
          );
          window.location.href = "/screens/Home/";
        }
      } catch (error) {
        console.error("❌ Erro ao buscar dados do cliente:", error);
        window.location.href = "/screens/Home/";
      }
    } else {
      console.log("🚪 Nenhum usuário logado.");
    }
  });
}

export function verificarUsuarioLogado() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.log("⚠️ Usuário não logado. Redirecionando para a Home...");
      window.location.href = "/screens/Home/";
    }
  });
}

export async function logout() {
  try {
    await signOut(auth);
    window.location.href = "/screens/Home/";
  } catch (error) {
    console.error("❌ Erro ao sair:", error);
    alert("❌ Erro ao sair. Tente novamente.");
  }
}

/* ==============================
   LOGIN FACEBOOK / EMAIL
   ============================== */
document.addEventListener("DOMContentLoaded", () => {
  const btnFacebook = document.getElementById("socialLogin");
  if (btnFacebook) {
    btnFacebook.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        await setDoc(
          doc(db, "Cliente", user.uid),
          {
            nome: user.displayName || "",
            email: user.email || "",
            foto: user.photoURL || "",
            loginFacebook: true,
          },
          { merge: true }
        );

        alert(`✅ Bem-vindo, ${user.displayName || user.email}!`);

        mostrarAvisoBeta(() => {
          window.location.href = "/screens/User/";
        });
      } catch (error) {
        console.error("❌ Erro no login com Facebook:", error);
        alert("Erro ao fazer login com Facebook. Verifique o console.");
      }
    });
  }

  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const senha = document.getElementById("loginSenha").value.trim();

      if (!email || !senha) {
        alert("Preencha o e-mail e a senha!");
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          senha
        );
        const user = userCredential.user;

        console.log("✅ Login bem-sucedido:", user.email);
        const clienteRef = doc(db, "Cliente", user.uid);
        const clienteSnap = await getDoc(clienteRef);

        if (clienteSnap.exists()) {
          const cliente = clienteSnap.data();
          if (cliente.admin === true) {
            mostrarAvisoBeta(() => {
              window.location.href = "/screens/Adm/";
            });
          } else {
            mostrarAvisoBeta(() => {
              window.location.href = "/screens/User/";
            });
          }
        } else {
          mostrarAvisoBeta(() => {
            window.location.href = "/screens/User/";
          });
        }
      } catch (error) {
        console.error("❌ Erro no login com e-mail/senha:", error);
        alert("E-mail ou senha incorretos.");
      }
    });
  }


  /* ==============================
      LOGIN COM GOOGLE
     ============================== */

  const btnGoogleLogin = document.getElementById("loginGoogle");
  if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        await setDoc(
          doc(db, "Cliente", user.uid),
          {
            nome: user.displayName || "",
            email: user.email || "",
            foto: user.photoURL || "",
            loginGoogle: true,
          },
          { merge: true }
        );

        alert(`✅ Bem-vindo, ${user.displayName || user.email}!`);

        mostrarAvisoBeta(() => {
          window.location.href = "/screens/User/";
        });

      } catch (error) {
        console.error("❌ Erro no login com Google:", error);
        alert("Erro ao fazer login com Google.");
      }
    });
  }

  /* ==============================
    CADASTRO COM GOOGLE
   ============================== */
  const btnGoogleCadastro = document.getElementById("googleCadastro");
  if (btnGoogleCadastro) {
    btnGoogleCadastro.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        await setDoc(
          doc(db, "Cliente", user.uid),
          {
            idAuth: user.uid,
            nome: user.displayName || "",
            email: user.email || "",
            cpfCnpj: "",
            telefone: "",
            foto: user.photoURL || "",
            loginGoogle: true,
            admin: false,
          },
          { merge: true }
        );

        alert(`✅ Conta criada com Google: ${user.displayName || user.email}`);

        mostrarAvisoBeta(() => {
          window.location.href = "/screens/User/";
        });

      } catch (error) {
        console.error("❌ Erro no cadastro com Google:", error);
        alert("Erro ao cadastrar via Google.");
      }
    });
  }
});

/* ==============================
   CADASTRO EMAIL/SENHA
   ============================== */
export async function criarUsuarioAuthEmailSenha(email, senha) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const user = userCredential.user;
    console.log("✅ Usuário criado no Firebase Auth:", user.uid);
    return user.uid;
  } catch (error) {
    console.error("❌ Erro ao criar usuário no Auth:", error);

    if (error.code === "auth/invalid-email") {
      alert("O e-mail informado é inválido.");
      return null;
    }

    if (error.code === "auth/email-already-in-use") {
      alert("Este e-mail já está cadastrado. Tente fazer login.");
      return null;
    }

    throw error;
  }
}

export async function loginUsuarioEmail(email, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    alert(`✅ Bem-vindo, ${user.email}!`);

    mostrarAvisoBeta(() => {
      window.location.href = "/screens/User/";
    });

    return user;
  } catch (error) {
    console.error("❌ Erro no login:", error);

    if (error.code === "auth/user-not-found") {
      alert("Nenhuma conta encontrada com este e-mail.");
    } else if (error.code === "auth/wrong-password") {
      alert("Senha incorreta. Tente novamente.");
    } else if (error.code === "auth/invalid-email") {
      alert("E-mail inválido.");
    } else {
      alert("Erro ao fazer login. Tente novamente.");
    }
  }
}