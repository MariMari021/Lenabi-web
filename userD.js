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

    // Obtenha o nome e email do usuário armazenados no localStorage
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const emailUsuario = localStorage.getItem('emailUsuario');

    // Verifica se os elementos existem antes de manipulá-los
    if (headerLogin && loginButton && nomeUsuarioElement && popup && conteudoPopup && emailUsuarioPopup) {
        if (nomeUsuario) {
            // Usuário logado
            console.log("Usuário logado:", nomeUsuario);
            headerLogin.style.display = "block";
            nomeUsuarioElement.textContent = nomeUsuario;  // Exibe o nome do usuário
            loginButton.style.display = "none";
        } else {
            // Usuário não logado
            console.log("Usuário não logado");
            headerLogin.style.display = "none";
            loginButton.style.display = "block";
        }

        // Adiciona um evento de clique ao headerLogin
        headerLogin.addEventListener("click", function () {
            // Exibe o popup
            popup.style.display = "block";

            // Preenche o conteúdo do popup com o nome e email do usuário
            conteudoPopup.textContent = nomeUsuario;
            emailUsuarioPopup.textContent = emailUsuario; // Adiciona o email do usuário ao popup
            console.log("Email do usuário:", nomeUsuario);
            console.log("Email do usuário:", emailUsuario);
        });
    } else {
        console.error("Elemento não encontrado. Verifique os IDs no HTML.");
    }
}

// Chama a função para renderizar o cabeçalho
renderizarCabecalho();


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


const itensCarrinho = {};

function alternarContador() {
    var contadorElement = document.getElementById("contador-coracao");
    var coracaoVazio = document.getElementById("coracao-vazio");
    var coracaoPintado = document.getElementById("coracao-pintado");

    if (contadorElement && coracaoVazio && coracaoPintado) {
        var valorInicial = parseInt(contadorElement.getAttribute("data-valor-inicial")) || 0;

        // Verifica se há itens no carrinho
        if (temItensNoCarrinho()) {
            // Se houver itens, mostra o coração pintado
            localStorage.setItem('coracaoEstado', 'pintado');
            coracaoVazio.style.display = "none";
            coracaoPintado.style.display = "inline-block";
        } else {
            // Se não houver itens, mostra o coração vazio
            localStorage.setItem('coracaoEstado', 'vazio');
            coracaoVazio.style.display = "inline-block";
            coracaoPintado.style.display = "none";
        }

        // Armazena o estado do coração no perfil do usuário
        const coracaoEstadoPerfil = localStorage.getItem('coracaoEstado');
        localStorage.setItem('coracaoEstadoPerfil', coracaoEstadoPerfil);

        // Alterna o estado ativo
        contadorElement.setAttribute("data-ativo", contadorElement.getAttribute("data-ativo") === "true" ? "false" : "true");
    }
}

window.onload = function () {
    const coracaoVazio = document.getElementById("coracao-vazio");
    const coracaoPintado = document.getElementById("coracao-pintado");

    coracaoVazio.addEventListener("click", function () {
        atualizarEstadoCoração('pintado');
    });

    coracaoPintado.addEventListener("click", function () {
        atualizarEstadoCoração('vazio');
    });

    // Restante do código...
    restaurarEstadoCoração();
    restaurarItensCarrinho();
};

function atualizarEstadoCoração(estado) {
    localStorage.setItem('coracaoEstadoPerfil', estado);
    atualizarVisualizacaoCoracao();
}

function restaurarEstadoCoração() {
    const coracaoEstadoPerfil = localStorage.getItem('coracaoEstadoPerfil');

    if (coracaoEstadoPerfil) {
        atualizarVisualizacaoCoracao();
    } else {
        localStorage.setItem('coracaoEstadoPerfil', 'vazio');
        exibirCoraçãoVazio();
    }
}


function atualizarVisualizacaoCoracao() {
    const coracaoEstadoPerfil = localStorage.getItem('coracaoEstadoPerfil');

    if (coracaoEstadoPerfil === 'pintado') {
        exibirCoraçãoPintado();
    } else {
        exibirCoraçãoVazio();
    }
}

function exibirCoraçãoPintado() {
    document.getElementById("coracao-vazio").style.display = "none";
    document.getElementById("coracao-pintado").style.display = "inline-block";
}

function exibirCoraçãoVazio() {
    document.getElementById("coracao-vazio").style.display = "inline-block";
    document.getElementById("coracao-pintado").style.display = "none";
}

function addCarrinho(itemNome, itemPreco) {
    if (!itensCarrinho[itemNome]) {
        // Se o item não estiver no carrinho, adiciona
        itensCarrinho[itemNome] = {
            quantity: 0,
            precoTotal: 0
        };
    }

    // Atualiza a quantidade e o preço total
    itensCarrinho[itemNome].quantity++;
    itensCarrinho[itemNome].precoTotal += itemPreco;

    // Atualiza o carrinho na interface do usuário
    updateCarrinho();

    // Atualiza o localStorage
    atualizarLocalStorage();
}




function criarLIItem(itemNome, quantidade, precoTotal) {
    const liItem = document.createElement("li");
    liItem.innerHTML = `
        <div class="item">
            <span>${itemNome}</span>
            <button class="remove" onclick="removeCarrinho('${itemNome}')">-</button>
            <span class="quantity">${quantidade}</span>
            <button class="add" onclick="addMaisUm('${itemNome}')">+</button>
            <span class="preco-total">R$${precoTotal.toFixed(2)}</span>
        </div>
    `;
    return liItem;
}

function restaurarItensCarrinho() {
    const usuarioAtual = localStorage.getItem('nomeUsuario');
    const carrinhoUsuario = JSON.parse(localStorage.getItem(usuarioAtual));

    if (carrinhoUsuario && carrinhoUsuario.itensCarrinho) {
        itensCarrinho = carrinhoUsuario.itensCarrinho;
        updateCarrinho();
    }
}

function calcularPrecoTotal() {
    let precoTotal = 0;
    for (let item in itensCarrinho) {
        precoTotal += itensCarrinho[item].itemPreco * itensCarrinho[item].quantity;
    }
    return precoTotal;
}

restaurarItensCarrinho();

function addMaisUm(itemNome) {
    // Adiciona mais um item ao carrinho
    addCarrinho(itemNome, itensCarrinho[itemNome].precoTotal / itensCarrinho[itemNome].quantity);
}


function atualizarItemCarrinho(itemNome) {
    itensCarrinho[itemNome].liItem.querySelector(".quantity").innerHTML = itensCarrinho[itemNome].quantity;
    itensCarrinho[itemNome].liItem.querySelector(".preco-total").innerHTML = "R$" + (itensCarrinho[itemNome].itemPreco * itensCarrinho[itemNome].quantity).toFixed(2);

    atualizarLocalStorage();
}


function atualizarLocalStorage() {
    const usuarioAtual = localStorage.getItem('nomeUsuario');
    const carrinhoUsuario = JSON.parse(localStorage.getItem(usuarioAtual)) || {};
    carrinhoUsuario.itensCarrinho = itensCarrinho;
    localStorage.setItem(usuarioAtual, JSON.stringify(carrinhoUsuario));
}

// Restaura os itens do carrinho ao carregar a página
restaurarItensCarrinho();


function updateCarrinho() {
    const listaItens = document.getElementById("itens-lista");
    listaItens.innerHTML = "";

    let cont = 0;

    // Itera sobre os itens no carrinho e atualiza a interface do usuário
    for (let itemNome in itensCarrinho) {
        const item = itensCarrinho[itemNome];
        cont += item.quantity;

        const liItem = criarLIItem(itemNome, item.quantity, item.precoTotal);
        listaItens.appendChild(liItem);
    }

    // Atualiza o contador de itens no coração
    document.getElementById("cont-favoritos").innerHTML = cont;

    // Calcula o valor total
    let precoTotal = Object.values(itensCarrinho).reduce((total, item) => total + item.precoTotal, 0);

    // Atualiza o valor total na interface do usuário
    document.getElementById("preco-total").innerHTML = "Valor Total: R$" + precoTotal.toFixed(2);
}




function removeCarrinho(itemNome) {
    if (itensCarrinho[itemNome]) {
        // Verifica se a quantidade é 1 antes de remover o item
        if (itensCarrinho[itemNome].quantity === 1) {
            delete itensCarrinho[itemNome];
        } else {
            // Atualiza a quantidade e o preço total
            itensCarrinho[itemNome].quantity--;
            itensCarrinho[itemNome].precoTotal -= itensCarrinho[itemNome].precoTotal / itensCarrinho[itemNome].quantity;
        }

        // Atualiza o carrinho na interface do usuário
        updateCarrinho();

        // Atualiza o localStorage
        atualizarLocalStorage();
    }
}



function limparCarrinho() {
    const itensLista = document.getElementById("itens-lista");

    if (itensLista.children.length === 0) {
        return;
    }

    itensLista.innerHTML = "";
    document.getElementById("preco-total").innerHTML = "Valor Total: R$0,00";

    for (let itemNome in itensCarrinho) {
        delete itensCarrinho[itemNome];
    }

    updateCarrinho();
    alternarContador();
    atualizarVisualizacaoCoracao();

    const usuarioAtual = localStorage.getItem('nomeUsuario');
    const carrinhoUsuario = JSON.parse(localStorage.getItem(usuarioAtual)) || {};
    carrinhoUsuario.itensCarrinho = {};
    localStorage.setItem(usuarioAtual, JSON.stringify(carrinhoUsuario));

    localStorage.removeItem('itensCarrinho');
}

function toggleFavoritos() {
    const itensCarrinhoDiv = document.getElementById("carrinho-itens");
    if (itensCarrinhoDiv.style.display === "none") {
        itensCarrinhoDiv.style.display = "block";
    } else {
        itensCarrinhoDiv.style.display = "none";
    }
}

restaurarItensCarrinho();