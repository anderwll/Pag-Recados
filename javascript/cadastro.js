// ------------------------- DECLARAÇÃO DAS VARIÁVEIS ------------------------

let formCriar = document.querySelector('#form-cadastro');
let formNotificacao = document.querySelector('#form-notificacao');
let nomeCriar = document.querySelector('#nome-cadastro');
let emailCriar = document.querySelector('#email-cadastro');
let senhaCriar = document.querySelector('#senha-cadastro');
let repetirSenhaCriar = document.querySelector('#repetir-senha-cadastro');
let btnCriar = document.querySelector('#btn-cadastro');

let validaNome = false;
let validaEmail = false;
let validaSenha = false;
let validaRepetirSenha = false;

// ------------------------------ EVENTOS ------------------------------------

nomeCriar.addEventListener('keyup', verificaNome);
emailCriar.addEventListener('keyup', verificaEmail);
senhaCriar.addEventListener('keyup', verificaSenha);
repetirSenhaCriar.addEventListener('keyup', verificaRepetirSenha);

formCriar.addEventListener('submit', (e) => {
    e.preventDefault();
    verificaInputs();
});

// --------------------- REGRA REGEX P/ VALIDAÇÃO DA SENHA ---------------------

let regSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// ------------------------------ FUNÇÕES --------------------------------------

function verificaNome() {
    if (nomeCriar.value.length <= 1) {
        formNotificacao.setAttribute('style', 'color: red; font-size: 20px; margin-bottom: 62px');
        formNotificacao.innerHTML = 'NOME OU APELIDO DEVE CONTER NO MÍNIMO UM CARACTER'
        nomeCriar.setAttribute('style', 'border-color: red');
        validaNome = false;

    } else {
        formNotificacao.setAttribute('style', 'color: green')
        formNotificacao.innerHTML = 'CRIAR CONTA ✔';
        nomeCriar.setAttribute('style', 'border-color: green');
        validaNome = true;
    }
}

function verificaEmail() {
    if (emailCriar.value.length < 10) {
        formNotificacao.setAttribute('style', 'color: red; font-size: 20px; margin-bottom: 62px');
        formNotificacao.innerHTML = 'EMAIL DEVE CONTER NO MÍNIMO DEZ CARACTERES'
        emailCriar.setAttribute('style', 'border-color: red');
        validaEmail = false;

    } else {
        formNotificacao.setAttribute('style', 'color: green')
        formNotificacao.innerHTML = 'CRIAR CONTA ✔✔';
        emailCriar.setAttribute('style', 'border-color: green');
        validaEmail = true;
    }
}

function verificaSenha() {
    let senhaValida = senhaCriar.value.match(regSenha);
    
    if (senhaCriar.value.length < 8) {
        formNotificacao.setAttribute('style', 'color: red; font-size: 20px; margin-bottom: 62px');
        formNotificacao.innerHTML = 'SENHA DEVE CONTER NO MÍNIMO OITO CARACTERES';
        senhaCriar.setAttribute('style', 'border-color: red');
        validaSenha = false;

    } else if (senhaValida === null) {
        formNotificacao.setAttribute('style', 'color: red; font-size: 20px; margin-bottom: 62px');
        formNotificacao.innerHTML = 'SENHA DEVE CONTER UMA LETRA MAIUSCULA E UM CARACTER';
        validaSenha = false;

    } else {
        formNotificacao.setAttribute('style', 'color: green')
        formNotificacao.innerHTML = 'CRIAR CONTA ✔✔✔';
        senhaCriar.setAttribute('style', 'border-color: green;');
        validaSenha = true;
    }
}

function verificaRepetirSenha() {
    if (senhaCriar.value !== repetirSenhaCriar.value) {
        formNotificacao.setAttribute('style', 'color: red; font-size: 20px; margin-bottom: 62px');
        formNotificacao.innerHTML = 'SENHA DIGITADA NÃO CORRESPONDE';
        repetirSenhaCriar.setAttribute('style', 'border-color: red');
        validaRepetirSenha = false;

    } else {
        formNotificacao.setAttribute('style', 'color: green')
        formNotificacao.innerHTML = 'CRIAR CONTA ✔✔✔✔';
        repetirSenhaCriar.setAttribute('style', 'border-color: green;');
        validaRepetirSenha = true;

    }

}

function verificaInputs() {
    if (nomeCriar.value === '' || emailCriar.value === '' || senhaCriar.value === '' || repetirSenhaCriar === '') {
        alert('Algo deu errado! Por favor verifique se você preencheu todos os campos.');

        return

    } else if (!validaNome || !validaEmail || !validaSenha || !validaRepetirSenha) {
        alert('Campos incorretos! Por favor verifique se você preencheu todos os campos.');

        return

    } else {
        salvarUsuario();
        limparInputs();

    }

}

// ------------------------------ SALVAR USUARIO --------------------------------------

function salvarUsuario() {
    let nomeHTML = nomeCriar.value;
    let emailHTML = emailCriar.value;
    let senhaHTML = senhaCriar.value;

    let Usuario = {
        nome: nomeHTML,
        email: emailHTML,
        senha: senhaHTML,
        recados: []
    }

    let listaUsuarios = buscarUsuariosStorage();

    let existe = existeEmail();

    if (existe) {
        alert('Email já cadastrado. Tente novamente!')
        limparInputs();
    } else {
        listaUsuarios.push(Usuario);

        salvarUsuarioNoStorage(listaUsuarios);

        let voltarPagLogin = window.confirm(`Conta criada com sucesso! Deseja voltar para a página de Login?`);

        if (voltarPagLogin) {
            window.location.href = 'pagina-login.html';

        } else {
            limparInputs();
        }
    }
}

function limparInputs() {
    formNotificacao.setAttribute('style', 'color: black');
    formNotificacao.innerHTML = 'CRIAR CONTA';
    nomeCriar.value = '';
    nomeCriar.setAttribute('style', 'border: none;');
    emailCriar.value = '';
    emailCriar.setAttribute('style', 'border: none;');
    senhaCriar.value = '';
    senhaCriar.setAttribute('style', 'border: none;');
    repetirSenhaCriar.value = '';
    repetirSenhaCriar.setAttribute('style', 'border: none;'); 
}

// ------------------------------ BUSCAR STORAGE --------------------------------------

function buscarUsuariosStorage() {
    let listaUsuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];

    return listaUsuarios;
}

function existeEmail() {
    let listaUsuarios = buscarUsuariosStorage();

    let existeEmail = listaUsuarios.some((usuario) => usuario.email === emailCriar.value);

    return existeEmail
}

// ------------------------------ SALVAR STORAGE --------------------------------------

function salvarUsuarioNoStorage(listaUsuarios) {
    localStorage.setItem('Usuarios', JSON.stringify(listaUsuarios));

}

