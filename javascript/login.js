// ------------------------- DECLARAÇÃO DAS VARIÁVEIS ------------------------ 

let formLogin =  document.querySelector('#form-login');
let emailLogin = document.querySelector('#email-login');
let senhaLogin = document.querySelector('#senha-login');

// ------------------------------ EVENTOS ------------------------------------

formLogin.addEventListener('submit', (e) => {    
    e.preventDefault();
    validarUsuarioSenha();
});


// ------------------------------ FUNÇÕES --------------------------------------

function validarUsuarioSenha() {
    let listaUsuarios = buscarUsuariosStorage(); 

    let emailHTML = emailLogin.value;
    let senhaHTML = senhaLogin.value;

    let usuarioEncontrado = listaUsuarios.find((usuario) => usuario.email === emailHTML);

    if (usuarioEncontrado != undefined) {
        let emailEncontrado = usuarioEncontrado.email;
        let senhaEncontrado = usuarioEncontrado.senha;

        if ((emailEncontrado === emailHTML) && (senhaEncontrado === senhaHTML)) {
          entrarRecados(emailEncontrado);

        } else {
            alert('Senha incorreta. TENTE NOVAMENTE!');
            senhaLogin.value = '';
        }

    } else {
        let confirma = window.confirm('Email não cadastrado! Deseja cadastrar-se agora?');

        if(confirma) {
            entrarCadastro();
        } else {
            limparCampos();
        }
    }
}

function buscarUsuariosStorage() {
  let listaUsuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];

  return listaUsuarios;
}

function entrarRecados(email) {
    sessionStorage.setItem('UsuarioLogado', JSON.stringify(email));

    window.location.href = 'pagina-recados.html';

    limparCampos();
}

function limparCampos() {
    emailLogin.value = '';
    senhaLogin.value = '';

}

function entrarCadastro() {
    window.location.href = 'pagina-cadastro.html';
    
}







