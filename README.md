<p align="center">
  <img src="src/screens/Home/Imagens/Fundo_Robo_Home.png" alt="Banner do Projeto MRL com Fundo de Robô e Tecnologia" width="100%" />
</p>

<h1 align="center">MRL - Desenvolvimento de Software e Tecnologias LTDA</h1>
<p align="center">✨ Soluções de ponta em software, design moderno e tecnologias digitais. ✨</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-34c759?style=for-the-badge" alt="Status: Concluído" />
  <img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-f97316?style=for-the-badge" alt="Tecnologias Frontend: HTML | CSS | JS" />
  <img src="https://img.shields.io/badge/Firebase-Hosting%20%7C%20Auth-ffca28?style=for-the-badge" alt="Firebase: Hosting | Auth" />
  <img src="https://img.shields.io/badge/Projeto-IFSP%20Campinas-0a84ff?style=for-the-badge" alt="Projeto: IFSP Campinas" />
</p>

---

## Sobre o Projeto

Este é o **projeto oficial de frontend** desenvolvido para apresentação da empresa **MRL – Desenvolvimento de Software e Tecnologias LTDA**. Ele foi realizado como parte da conclusão do **3º semestre do curso no IFSP Campinas**.

O foco principal do projeto foi a demonstração prática de:

* **Interface moderna e responsiva**: Garantindo uma experiência de usuário impecável em qualquer dispositivo.
* **Páginas dinâmicas com JavaScript**: Implementando funcionalidades interativas e manipulação do DOM.
* **Uso estratégico de Firebase**: Utilizando **Hosting** para deploy e **Authentication** para gerenciar acessos.
* **Catálogo funcional**: Uma vitrine de produtos ou serviços da empresa.
* **Área administrativa**: Completa com ajustes de acessibilidade e gerenciamento de usuários.

> 📢 **Importante:** Este repositório contém **somente o frontend**. Todo o processamento e a lógica de negócios são executados no navegador e através dos serviços do Firebase.

---

## Links e Recursos

Confira o projeto ao vivo e outros materiais de apoio:

| Recurso | Descrição | Link |
| :--- | :--- | :--- |
|  **Site Online** | Versão completa hospedada no Firebase. | [Acessar Site](https://mrl-desenvolvimento.web.app/screens/Home/) |
|  **Protótipo no Figma** | O design original e o fluxo de telas do projeto. | [Ver Protótipo](https://www.figma.com/proto/S3LNtzPZa2s20Oz8TnT4DX/Projeto-MRL) |
|  **Slide de Apresentação** | O material de apoio utilizado na apresentação do projeto. | [Ver Slide](https://www.canva.com/design/DAG5u6Tiaes/GMPMpuQyAM3jYC20zv5iwQ/edit) |

---

## Estrutura do Projeto

A organização básica do diretório `src/`:
```sh
Projeto-MRL/
│
├── src/
│ ├── screens/
│ │ ├── Home/
│ │ ├── Adm/
│ │ ├── User/
│ │ ├── Catalogo/
│ │ └── Acessibilidade/
│ │
│ ├── JS/
│ ├── index.html
│ └── 404.html
│
├── firebase.json
├── .firebaserc
├── package.json
└── README.md
```
---

## Dashboard do Projeto 

### Progresso Geral (100%)

| Módulo | Status | Concluído |
| :--- | :--- | :--- |
| **Página Home** | 100% | 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢 |
| **Página ADM** | 100% | 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢 |
| **Sistema de Login** | 100% | 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢 |
| **Catálogo** | 100% | 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢 |
| **Acessibilidade** | 100% | 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢 |
| **Responsividade Mobile** | 100% | 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢 |

---

## Tecnologias Utilizadas

O projeto foi construído com uma combinação de tecnologias sólidas de frontend e serviços do Google Firebase:

### **Frontend**

* ✔️ **HTML5**
* ✔️ **CSS3** (Incluindo Design Responsivo)
* ✔️ **JavaScript ES6+** (Para Páginas Dinâmicas)

### **Firebase**

* ✔️ **Firebase Hosting**: Para o deploy e hospedagem da aplicação.
* ✔️ **Firebase Authentication**: Para o sistema de Login/Cadastro e gestão de usuários.
* ✔️ **Firebase Realtime Database**: Para a persistência de dados (como perfil de usuário, catálogo, etc.).

---

## Como Rodar o Projeto Localmente

Siga estes passos para ter uma cópia do projeto rodando na sua máquina.

### **Pré-requisitos**

Certifique-se de ter instalado em sua máquina:

* [**Node.js**](https://nodejs.org/en/) (versão $>= 12$)
* **npm** (gerenciador de pacotes do Node)

### **Instalação**

1.  Clone este repositório:
    ```sh
    git clone https://github.com/Skartty/Projeto-MRL.git
    ```
2.  Navegue até o diretório raiz do projeto:
    ```sh
    cd Projeto-MRL
    ```
3.  Instale as dependências necessárias:
    ```sh
    npm install
    ```

### **Rodando Localmente**

O projeto é baseado em frontend puro (HTML, CSS, JS) e pode ser servido com qualquer servidor HTTP simples.

**Opção 1 – Usando `serve`**

```sh
npx serve src
```
**Opção 2 – Usando `http-server`**
```sh
npx http-server src -o
```
O projeto será aberto automaticamente no seu navegador.

---
```sh
Projeto desenvolvido por Isabella Braga — IFSP Campinas, 3º Semestre.
```
<p align="center">
  <img src="src/screens/Home/Imagens/Logo_MRL.png" alt="Logo MRL - Software and Technologies Development LTDA" width="220px" />
</p> <p align="center"> © 2024 — MRL Desenvolvimento de Software e Tecnologias LTDA </p>
