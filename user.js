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
    const userHeaderMobile = document.getElementById("userHeaderMobile");
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
            userHeaderMobile.style.display = "none";
            popup.style.display = "none"
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



const toggleMenu = () => {
    // Fecha a openFav antes de abrir ou fechar o menu
    if (document.body.classList.contains("openFav")) {
        toggleFav();
    }

    // Fecha o toggleMobile antes de abrir ou fechar o menu
    if (document.body.classList.contains("openMobile")) {
        toggleMobile();
    }

    // Abre ou fecha o menu
    document.body.classList.toggle("open");
};

const toggleMobile = () => {
    // Fecha o menu antes de abrir a navbarUser
    if (document.body.classList.contains("open")) {
        toggleMenu();
    }
    // Abre ou fecha a navbarUser
    document.body.classList.toggle("openMobile");
};

const toggleFav = () => {
    // Fecha o menu antes de abrir a openFav
    if (document.body.classList.contains("open")) {
        toggleMenu();
    }
    // Abre ou fecha a openFav
    document.body.classList.toggle("openFav");
};


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

    if (window.innerWidth <= 975) {
        popupElement.style.display = "none"
    }
}




//CARRINHO

document.addEventListener("DOMContentLoaded", function () {
    const carrinhoItens = JSON.parse(localStorage.getItem("carrinho")) || [];
    const itensLista = document.getElementById("itens-lista");
    const precoTotalSpan = document.getElementById("preco-total");
    const contFavoritosSpan = document.getElementById("cont-favoritos");
    const limparCarrinhoBtn = document.querySelector(".car");

    function toggleFavoritos() {
        const carrinhoItensDiv = document.getElementById("carrinho-itens");
        carrinhoItensDiv.style.display = carrinhoItensDiv.style.display === "none" ? "block" : "none";
    }

    function limparCarrinho() {
        carrinhoItens.length = 0;
        atualizarCarrinho();
        salvarCarrinhoNoLocalStorage();
        resetProdutinhos();
    }

    function atualizarCarrinho() {
        itensLista.innerHTML = "";
        let total = 0;

        carrinhoItens.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="item-carrinho">
                    <span>${item.nome}</span>
                    <button class="remove" onclick="removeCarrinho('${item.nome}')">-</button>
                    <span class="quantity">${item.quantidade}</span>
                    <button class="add" onclick="addMaisUm('${item.nome}')">+</button>
                    <span class="preco-total">R$${(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
            `;
            itensLista.appendChild(li);
            total += item.preco * item.quantidade;
        });

        precoTotalSpan.textContent = `Valor Total: R$${total.toFixed(2)}`;
        contFavoritosSpan.textContent = carrinhoItens.reduce((acc, item) => acc + item.quantidade, 0).toString();
        limparCarrinhoBtn.style.display = "block" ;
    }

    function addToCart(nome, preco) {
        const existingItem = carrinhoItens.find(item => item.nome === nome);

        if (existingItem) {
            existingItem.quantidade++;
        } else {
            carrinhoItens.push({ nome, preco, quantidade: 1 });
        }

        atualizarCarrinho();
        salvarCarrinhoNoLocalStorage();
        resetProdutinhos();
    }

    window.removeCarrinho = function (nome) {
        const index = carrinhoItens.findIndex(item => item.nome === nome);

        if (index !== -1) {
            const item = carrinhoItens[index];
            item.quantidade--;

            if (item.quantidade === 0) {
                const liToRemove = document.querySelector(`#li-${item.nome}`);
                if (liToRemove) {
                    liToRemove.remove();
                }

                carrinhoItens.splice(index, 1);
            }
        }

        atualizarCarrinho();
        salvarCarrinhoNoLocalStorage();
        resetProdutinhos();
    };

    window.addMaisUm = function (nome) {
        const item = carrinhoItens.find(item => item.nome === nome);

        if (item) {
            item.quantidade++;
        }

        atualizarCarrinho();
        salvarCarrinhoNoLocalStorage();
        resetProdutinhos();
    };

    function resetProdutinhos() {
        const produtinhosBtns = document.querySelectorAll(".produtinhos");
        produtinhosBtns.forEach(btn => {
            const coracaoVazio = btn.querySelector(".icon-coracao");
            const coracaoPintado = btn.querySelector(".icon-coracaoP");
            const valorInicialElement = btn.nextElementSibling; // assume que p.espec-coracao é irmão do botão
            const produtoNome = btn.getAttribute("data-produto-nome");
            const produtoNoCarrinho = carrinhoItens.find(item => item.nome === produtoNome);
    
            coracaoVazio.style.display = produtoNoCarrinho ? "none" : "block";
            coracaoPintado.style.display = produtoNoCarrinho ? "block" : "none";
    
            // Atualiza o valor inicial com base no estado do coração
            if (produtoNoCarrinho) {
                // Se o produto está no carrinho, verifica se já foi incrementado nesta atualização
                const valorAtual = parseInt(valorInicialElement.textContent);
                const valorInicial = parseInt(valorInicialElement.getAttribute("data-valor-inicial"));
    
                if (valorAtual === valorInicial) {
                    // Incrementa uma unidade apenas se ainda não foi incrementado
                    valorInicialElement.textContent = (valorAtual + 1).toString();
                }
            } else {
                // Se o produto não está no carrinho, restaura o valor inicial do HTML
                const valorInicial = parseInt(valorInicialElement.getAttribute("data-valor-inicial"));
                valorInicialElement.textContent = valorInicial.toString();
            }
        });
    
        // Atualiza a quantidade de itens no carrinho
        contFavoritosSpan.textContent = carrinhoItens.reduce((acc, item) => acc + item.quantidade, 0).toString();
    }
    
    
    
    
    

    const produtinhoBtns = document.querySelectorAll(".produtinhos");
    produtinhoBtns.forEach(produtinhoBtn => {
        produtinhoBtn.addEventListener("click", function () {
            const nome = this.getAttribute("data-produto-nome");
            const preco = parseFloat(this.getAttribute("data-preco"));
            const produtoNoCarrinho = carrinhoItens.find(item => item.nome === nome);

            if (!produtoNoCarrinho) {
                addToCart(nome, preco);
            } else {
                removeCarrinho(nome);
            }

            resetProdutinhos();
        });
    });

    const favoritosBtn = document.getElementById("favoritos");
    favoritosBtn.addEventListener("click", toggleFavoritos);

    limparCarrinhoBtn.addEventListener("click", function () {
        limparCarrinho();
    });

    function salvarCarrinhoNoLocalStorage() {
        localStorage.setItem("carrinho", JSON.stringify(carrinhoItens));
    }

    atualizarCarrinho();
    resetProdutinhos();
});















