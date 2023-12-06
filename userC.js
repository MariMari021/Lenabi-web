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

function toggleFavoritos() {
  const carrinhoItens = document.getElementById('carrinho-itens');
  carrinhoItens.style.display = carrinhoItens.style.display === 'none' ? 'block' : 'none';
}


document.addEventListener('DOMContentLoaded', function () {
  const contFavoritos = document.getElementById('cont-favoritos');
  const contadorCoracao = document.getElementById('contador-coracao');

  // Recupera o estado do coração ao carregar a página
  const contadorCoracaoValue = parseInt(localStorage.getItem('contadorCoracao')) || 0;

  contFavoritos.textContent = localStorage.getItem('contFavoritos') || '0';
  contadorCoracao.textContent = contadorCoracaoValue.toString();

  const coracaoPintado = document.querySelector('.icon-coracaoP');
  const coracaoVazio = document.querySelector('.icon-coracao');

  if (contadorCoracaoValue > 0) {
      coracaoPintado.style.display = 'inline';
      coracaoVazio.style.display = 'none';
  } else {
      coracaoPintado.style.display = 'none';
      coracaoVazio.style.display = 'inline';
  }

  // Adiciona um evento de clique ao botão do produto
  const botoesProdutos = document.querySelectorAll('button.produtinhos');
  if (botoesProdutos) {
      botoesProdutos.forEach(botao => {
          botao.addEventListener('click', function () {
              const produtoNome = botao.getAttribute('data-produto-nome');
              const precoDoProduto = parseFloat(botao.getAttribute('data-preco'));
              const quantidade = 1;  // ou qualquer valor apropriado para identificar o produto

              toggleCarrinho(produtoNome, precoDoProduto, quantidade);
          });
      });
  }

  // Atualiza o carrinho após o estado do coração ter sido definido
  updateCarrinho();
});


window.addEventListener('beforeunload', function () {
  const contFavoritos = document.getElementById('cont-favoritos');
  const contadorCoracao = document.getElementById('contador-coracao');

  localStorage.setItem('contFavoritos', contFavoritos.textContent);
  localStorage.setItem('contadorCoracao', contadorCoracao.textContent);
});




function toggleCarrinho(nome, preco, quantidade) {
  console.log(`Toggling carrinho para: ${nome}, ${preco}, ${quantidade}`);

  const contFavoritos = document.getElementById('cont-favoritos');
  const contadorCoracao = document.getElementById('contador-coracao');
  const coracaoPintado = document.querySelector('.icon-coracaoP');
  const coracaoVazio = document.querySelector('.icon-coracao');

  const produtoNoCarrinho = localStorage.getItem(nome);

  if (produtoNoCarrinho) {
      localStorage.removeItem(nome);
      contFavoritos.textContent = Math.max(parseInt(contFavoritos.textContent) - 1, 0);
      contadorCoracao.textContent = Math.max(parseInt(contadorCoracao.textContent) - 1, 0);
      coracaoVazio.style.display = 'inline';
      coracaoPintado.style.display = 'none';
      updateCarrinho();
      console.log(`Removido: ${nome}`);
  } else {
      localStorage.setItem(nome, JSON.stringify({ nome, preco, quantidade: 1 }));
      contFavoritos.textContent = parseInt(contFavoritos.textContent) + 1;
      contadorCoracao.textContent = parseInt(contadorCoracao.textContent) + 1;
      coracaoVazio.style.display = 'none';
      coracaoPintado.style.display = 'inline';
      updateCarrinho();
      console.log(`Adicionado: ${nome}`);
  }
}








function limparCarrinho() {
  // Verifica se há itens no carrinho antes de limpar
  if (localStorage.length > 0) {
    // Salva o estado atual do coração antes de limpar
    const contadorCoracao = document.getElementById('contador-coracao');
    localStorage.setItem('contadorCoracao', contadorCoracao.textContent);

    // Limpa apenas os itens do carrinho no localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== 'contFavoritos' && key !== 'contadorCoracao') {
        localStorage.removeItem(key);
      }
    }

    // Atualiza a exibição do carrinho
    updateCarrinho();
  }

  // Atualiza o estado do coração
  const contFavoritos = document.getElementById('cont-favoritos');
  const coracaoVazio = document.querySelector('.icon-coracao');
  const coracaoPintado = document.querySelector('.icon-coracaoP');

  contFavoritos.textContent = '0';

  // Verifica se há itens no carrinho antes de definir o estado do coração como vazio
  if (localStorage.length === 0) {
    coracaoVazio.style.display = 'inline';
    coracaoPintado.style.display = 'none';

    // Se o carrinho ficou vazio, salva o estado do coração como vazio
    localStorage.setItem('contadorCoracao', '0');
  }
}

function removeCarrinho(nome) {
  const item = JSON.parse(localStorage.getItem(nome));
  if (item) {
    if (item.quantidade > 1) {
      item.quantidade -= 1;
      localStorage.setItem(nome, JSON.stringify(item));
    } else {
      localStorage.removeItem(nome);

      const contFavoritos = document.getElementById('cont-favoritos');
      const coracaoVazio = document.querySelector('.icon-coracao');
      const coracaoPintado = document.querySelector('.icon-coracaoP');
      const contadorCoracao = document.getElementById('contador-coracao');

      contFavoritos.textContent = Math.max(parseInt(contFavoritos.textContent) - 1, 0);
      contadorCoracao.textContent = Math.max(parseInt(contadorCoracao.textContent) - 1, 0);

      coracaoVazio.style.display = 'inline';
      coracaoPintado.style.display = 'none';

      // Se o carrinho ficou vazio, salva o estado do coração como vazio
      localStorage.setItem('contadorCoracao', '0');
    }

    updateCarrinho();
  }
}


function addMaisUm(nome) {
  // Adiciona um item ao carrinho no localStorage
  const item = JSON.parse(localStorage.getItem(nome));
  if (item) {
    item.quantidade += 1;
    localStorage.setItem(nome, JSON.stringify(item));

    // Atualiza a exibição do carrinho
    updateCarrinho();
  }
}

function updateCarrinho() {
  const carrinhoItens = document.getElementById('carrinho-itens');
  const itensLista = document.getElementById('itens-lista');
  const precoTotal = document.getElementById('preco-total');

  itensLista.innerHTML = '';

  let total = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = JSON.parse(localStorage.getItem(key));

    if (item && item.nome && item.preco && item.quantidade) {
      const li = document.createElement('li');
      li.innerHTML = `
          <div class="item">
            <span>${item.nome}</span>
            <button class="remove" onclick="removeCarrinho('${item.nome}')">-</button>
            <span class="quantity">${item.quantidade}</span>
            <button class="add" onclick="addMaisUm('${item.nome}')">+</button>
            <span class="preco-total">R$${(item.preco * item.quantidade).toFixed(2)}</span>
          </div>
        `;

      total += item.preco * item.quantidade;
      itensLista.appendChild(li);
    }
  }

  precoTotal.textContent = `Valor Total: R$${total.toFixed(2)}`;

  carrinhoItens.style.display = localStorage.length > 0 ? 'block' : 'none';
}

