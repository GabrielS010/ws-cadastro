function cadastrarUsuario(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirma = document.getElementById('confirma').value;

    if (senha !== confirma) {
        alert("As senhas não conferem, mano!");
        return;
    }

    const usuario = { nome, email, senha };
    localStorage.setItem(email, JSON.stringify(usuario));
    alert("Cadastro realizado com sucesso! Faça seu login.");
    window.location.href = 'index.html'; 
}

function fazerLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const userSalvo = JSON.parse(localStorage.getItem(email));

    if (userSalvo && userSalvo.senha === senha) {
        sessionStorage.setItem('logado', userSalvo.nome);
        window.location.href = 'principal.html'; 
    } else {
        alert("Email ou senha incorretos!");
    }
}

function verificarRecuperacao(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const userSalvo = JSON.parse(localStorage.getItem(email));

    if (userSalvo && userSalvo.nome === nome) {
        sessionStorage.setItem('emailRecuperacao', email);
        window.location.href = 'nova-senha.html';
    } else {
        alert("Dados não encontrados no sistema.");
    }
}

function salvarNovaSenha(e) {
    e.preventDefault();
    const senha = document.getElementById('nova-senha').value;
    const confirma = document.getElementById('confirma-senha').value;
    const email = sessionStorage.getItem('emailRecuperacao');

    if (senha !== confirma) {
        alert("As senhas não conferem!");
        return;
    }

    const userSalvo = JSON.parse(localStorage.getItem(email));
    userSalvo.senha = senha;
    localStorage.setItem(email, JSON.stringify(userSalvo));
    sessionStorage.removeItem('emailRecuperacao');
    
    alert("Senha alterada com sucesso!");
    window.location.href = 'index.html';
}

function cadastrarProduto(e) {
    e.preventDefault();
    const rfid = document.getElementById('rfid').value;
    const nome = document.getElementById('nomeProd').value;
    const preco = document.getElementById('preco').value;

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push({ rfid, nome, preco });
    localStorage.setItem('produtos', JSON.stringify(produtos));

    alert("Produto cadastrado com sucesso!");
    window.location.href = 'principal.html';
}

function carregarProdutos() {
    const lista = document.getElementById('lista-produtos');
    if (!lista) return;

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    if (produtos.length === 0) {
        lista.innerHTML = '<p>Nenhum produto cadastrado no momento.</p>';
        return;
    }

    produtos.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'card-produto';
        div.innerHTML = `<strong>RFID:</strong> ${prod.rfid} <br> <strong>Nome:</strong> ${prod.nome} <br> <strong>Preço:</strong> R$ ${prod.preco}`;
        lista.appendChild(div);
    });
}

if (window.location.pathname.includes('listar-produtos.html')) {
    window.onload = carregarProdutos;
}