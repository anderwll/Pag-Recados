// ----------- VALIDAÇÃO DO USUARIO PARA ACESSAR A PÁGINA RECADOS ------------

validaUsuarioLogado();

// ------------------------- DECLARAÇÃO DAS VARIÁVEIS ------------------------

let mostrarNome = document.querySelector('.h2-recados');

let formRecados = document.querySelector('#form-recados');
let campoDescricao = document.querySelector('#input-desc');
let campoDetalhamento = document.querySelector('#input-det');
let btnSalvar = document.querySelector('.btn-salvar');
let btnSair = document.querySelector('.btn-sair');

let tabelaRecados = document.querySelector('#table-recados');
let btnEditar = document.querySelector('#btn-edit');
let btnExcluir = document.querySelector('#btn-delet');

let btnAtualizar = document.querySelector('.btn-atualizar');
let btnCancelar = document.querySelector('.btn-cancelar');

// ------------------------------ EVENTOS ------------------------------------

formRecados.addEventListener('submit', (e) => {
    e.preventDefault();
    adicionarNovoRecado();
});

document.addEventListener('DOMContentLoaded', pegarDadosStorage);

btnCancelar.addEventListener('click', cancelarEdicao);

btnSair.addEventListener('click', sairPagRecados);

// ------------------------------ FUNÇÕES --------------------------------------

function buscarUsuariosStorage() {
    let listaUsuarios = JSON.parse(localStorage.getItem("Usuarios"));
    
    return listaUsuarios;
}

function usuarioEncontrado() {
    let listaUsuarios = buscarUsuariosStorage() || [];
    let usuarioLogado = JSON.parse(sessionStorage.getItem("UsuarioLogado"));

    let usuarioEncontrado = listaUsuarios.find((usuario) => usuario.email === usuarioLogado);
    return usuarioEncontrado;
}

function adicionarNovoRecado() {
    let usuarioRecados = usuarioEncontrado() ;
    let listaRecados = usuarioRecados.recados || [];

    let id = listaRecados.length;

    let existID = usuarioRecados.recados.findIndex((recado) => recado.id == id);
    if(existID !== -1) {
        id = existID + listaRecados.length
    } 

    let descricao = campoDescricao.value;
    let detalhamento = campoDetalhamento.value;
    let recados = {
        id,
        descricao,
        detalhamento
    }

    if(descricao && detalhamento) {
        
        listaRecados.push(recados); 

        salvarNaTabela(recados);
        limparCampos();
        atualizarLista(usuarioRecados); 

    } else {
        return
    }     
}

function salvarNaTabela(dadosRecados) {
    let novaLinha = document.createElement('tr');
    let colunaID = document.createElement('td');
    let colunaDescricao = document.createElement('td');
    let colunaDetalhamento = document.createElement('td');
    let colunaAcoes = document.createElement('td');

    novaLinha.setAttribute('class', 'records');
    novaLinha.setAttribute('id', dadosRecados.id);
    colunaID.innerHTML = dadosRecados.id;
    colunaDescricao.innerHTML = dadosRecados.descricao;
    colunaDetalhamento.innerHTML = dadosRecados.detalhamento;
    colunaAcoes.innerHTML = `
                                <button class="btn-edit" onclick="prepararEdicao(${dadosRecados.id})">EDITAR</button>
                                <button class="btn-delet" onclick="apagarRegistro(${dadosRecados.id})">APAGAR</button>
                            `

    novaLinha.appendChild(colunaID);
    novaLinha.appendChild(colunaDescricao);
    novaLinha.appendChild(colunaDetalhamento);
    novaLinha.appendChild(colunaAcoes);

    tabelaRecados.appendChild(novaLinha);

}

function atualizarLista(usuarioAtualizado) {
    let listaUsuarios = buscarUsuariosStorage();
    let usuarioLogado = JSON.parse(sessionStorage.getItem("UsuarioLogado"));

    let indiceEncontrado = listaUsuarios.findIndex((usuario) => usuario.email === usuarioLogado);
    listaUsuarios.splice(indiceEncontrado, 1);

    listaUsuarios.push(usuarioAtualizado)

    console.log(listaUsuarios)

    salvarUsuariosNoStorage(listaUsuarios)
}

function salvarUsuariosNoStorage(listaAtualizada) {
    localStorage.setItem('Usuarios', JSON.stringify(listaAtualizada));

}

function limparCampos() {
    campoDescricao.value = '';
    campoDetalhamento.value = '';
}

function pegarDadosStorage() {
    let listaUsuarios = buscarUsuariosStorage();
    let usuarioLogado = JSON.parse(sessionStorage.getItem("UsuarioLogado"));

    let usuarioEncontrado = listaUsuarios.find((usuario) => usuario.email === usuarioLogado);

    if(usuarioEncontrado) {
        for (const recados of usuarioEncontrado.recados) {
            salvarNaTabela(recados);
            BemVindo();
        }
        return
    }
}

function BemVindo() {
    let listaUsuarios = buscarUsuariosStorage();
    let usuarioLogado = JSON.parse(sessionStorage.getItem("UsuarioLogado"));

    let usuarioEncontrado = listaUsuarios.find((usuario) => usuario.email === usuarioLogado);

    mostrarNome.innerHTML = `Bem Vindo(a), ${usuarioEncontrado.nome}!`
}

function apagarRegistro(id) {
    let usuarioRecados = usuarioEncontrado();
    let indiceRecado = usuarioRecados.recados.findIndex((indice) => indice.id == id)

    let confirma = window.confirm(`Tem certeza que deseja remover o recado de ID ${id}?`);

    if(confirma) {
        let linhasTabela = document.querySelectorAll('.records');
    
        for (let linha of linhasTabela) {

        if(linha.id == id) {
            tabelaRecados.removeChild(linha)
            usuarioRecados.recados.splice(indiceRecado, 1)
            alert('Recado removido com SUCESSO!') 
        }
    }
        atualizarLista(usuarioRecados);
    } else {
        return
    }
}

function prepararEdicao(id) {
    btnSalvar.setAttribute('style', 'display: none');
    campoDescricao.setAttribute('style', 'width: 33vw');
    campoDetalhamento.setAttribute('style', 'width: 46vw');
    btnAtualizar.setAttribute('style', 'display: inline');
    btnAtualizar.setAttribute('onclick', `atualizarRecado(${id})`);
    btnCancelar.setAttribute('style', 'display: inline');

    let usuario = usuarioEncontrado();
    let recadoEncontrado = usuario.recados.find((recado) => recado.id == id);

    campoDescricao.value = recadoEncontrado.descricao;
    campoDetalhamento.value = recadoEncontrado.detalhamento;
}

function cancelarEdicao() {
    limparCampos();
    btnSalvar.setAttribute('style', 'display: inline');
    campoDescricao.setAttribute('style', 'width: 35vw');
    campoDetalhamento.setAttribute('style', 'width: 52vw');
    btnAtualizar.setAttribute('style', 'display: none');
    btnCancelar.setAttribute('style', 'display: none');
}

function atualizarRecado(id) {
    let novaDescricao = campoDescricao.value;
    let novoDetalhamento = campoDetalhamento.value;

    let recadoAtualizado = {
        id: id,
        descricao : novaDescricao,
        detalhamento : novoDetalhamento
    }

    let usuarioRecados = usuarioEncontrado();
    let indiceRecado = usuarioRecados.recados.findIndex((indice) => indice.id == id);

    usuarioRecados.recados[indiceRecado] = recadoAtualizado;

    let linhasTabela = document.querySelectorAll('.records');

    for (let linha of linhasTabela) {
        if(linha.id == id) {
            let colunas = linha.children;

            colunas[0].innerHTML = recadoAtualizado.id;

            colunas[1].innerHTML = recadoAtualizado.descricao;

            colunas[2].innerHTML = recadoAtualizado.detalhamento;
        }
    }

    atualizarLista(usuarioRecados);
    cancelarEdicao();
}

function sairPagRecados() {
    sessionStorage.removeItem('UsuarioLogado');

    window.location.href = 'pagina-login.html';
}

function validaUsuarioLogado() {
    let usuarioLogado = sessionStorage.getItem('UsuarioLogado');

    if(!usuarioLogado) {
        alert('Você precisa estar logado para acessar essa página!');

        window.location.href = 'pagina-login.html';
    }
}






















