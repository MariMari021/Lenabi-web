document.addEventListener('DOMContentLoaded', function () {
    renderizarCabecalho();
});


function renderizarCabecalho() {
    const headerLogin = document.getElementById("userHeader");
    const loginButton = document.getElementById("loginButton");
    const nomeUsuarioElement = document.getElementById("nomeUsuario");
    const popup = document.getElementById("popup");
    const conteudoPopup = document.getElementById("conteudoPopup");
    const emailUsuarioPopup = document.getElementById("emailUsuario");
    const userHeaderMobile  = document.getElementById("userHeaderMobile");
    const sideUser = document.getElementById("sideUser");
    const nomeMobile = document.getElementById("userMobile");
    const conteudoMobile = document.getElementById("conteudoMobile");
    const emailMobile = document.getElementById("emailMobile");


    // Obtenha o nome e email do usuário armazenados no localStorage
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const emailUsuario = localStorage.getItem('emailUsuario');

    // Verifica se os elementos existem antes de manipulá-los
    if (headerLogin && loginButton && nomeUsuarioElement && popup && conteudoPopup && emailUsuarioPopup) {
        // Verifica a largura da tela
        console.log("Largura da tela:", window.innerWidth);
        if (window.innerWidth >= 975) {
            if (nomeUsuario) {
                // Usuário logado
                console.log("Usuário logado:", nomeUsuario);
                headerLogin.style.display = "flex";
                nomeUsuarioElement.textContent = nomeUsuario;  // Exibe o nome do usuário
                loginButton.style.display = "none";
            } else {
                // Usuário não logado
                console.log("Usuário não logado");
                headerLogin.style.display = "none";
                loginButton.style.display = "flex";
            }

            // Adiciona um evento de clique ao headerLogin
            headerLogin.addEventListener("click", function () {
                // Exibe o popup
                popup.style.display = "grid";

                // Preenche o conteúdo do popup com o nome e email do usuário
                conteudoPopup.textContent = nomeUsuario;
                emailUsuarioPopup.textContent = emailUsuario; // Adiciona o email do usuário ao popup
                console.log("Nome do usuário:", nomeUsuario);
                console.log("Email do usuário:", emailUsuario);
            });
        } if (window.innerWidth <= 975) {
            loginButton.style.display = "none";
            headerLogin.style.display = "none";
            if (nomeUsuario) {
                // Usuário logado
                console.log("Usuário logado:", nomeUsuario);
                userHeaderMobile.style.display = "flex";
                nomeMobile.textContent = nomeUsuario;  // Exibe o nome do usuário
                sideUser.style.display = "none";
                conteudoMobile.textContent = nomeUsuario;
                emailMobile.textContent = emailUsuario;

            } else {
                // Usuário não logado
                console.log("Usuário não logado");
                userHeaderMobile.style.display = "none";
                sideUser.style.display = "flex";
            }
        } else {
            console.error("A largura da tela é maior que 975 pixels.");
        }
    } else {
        console.error("Elemento não encontrado. Verifique os IDs no HTML.");
    }
}

// Chame a função para garantir que seja executada
renderizarCabecalho();



const toggleMenu = () => document.body.classList.toggle("open");
const toggleMobile = () => document.body.classList.toggle("openMobile");




function logout() {
    // Remove o nome do usuário do localStorage
    localStorage.removeItem('nomeUsuario');
    // Limpe outros dados de usuário, se houver
    window.location.href = "index.html";
}



let popupVisivel = false;

function mostrarOcultarPopup() {
    const popupElement = document.getElementById('popup');

    popupVisivel = !popupVisivel;
    popupElement.classList.toggle('show', popupVisivel);
}
