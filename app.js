// Declaração de variáveis
let textoAviso = document.getElementById('texto__aviso');
let tituloTextoCodificado = document.getElementById('titulo__texto__codificado');
let tituloTextoDecodificado = document.getElementById('titulo__texto__decodificado');
let botaoCodificar = document.getElementById('codificar__btn');
let botaoDecodificar = document.getElementById('decodificar__btn');
let botaoCopiar = document.getElementById('copiar__texto__btn');
let textoResultado = document.getElementById('texto__resultante');
let imagemAreaResultado = document.getElementById('imagem__area__resultado');
let mensagemInicial = document.getElementById('mensagem__inicial');
let mensagemIndicador = document.getElementById('mensagem__indicador');


// Funções
function limparTextarea() {
  document.querySelector('textarea').value = '';
}

function resetarInterface() {
  imagemAreaResultado.style.display = 'block';
  mensagemInicial.style.display = 'block';
  mensagemIndicador.style.display = 'block';
  tituloTextoCodificado.style.display = 'none';
  tituloTextoDecodificado.style.display = 'none';
  textoResultado.style.display = 'none';
  botaoCopiar.style.display = 'none';
}

function verificarModificacao(textoInserido, textoModificado) {
  if (textoInserido === textoModificado) {
    alert("O texto inserido não está codificado. Insira um texto codificado.");
    resetInterface();
    limparTextarea();
    return true;
  }
  return false;
}

function codificarTexto(texto) {
  return texto.replace(/e/g, "enter")
              .replace(/i/g, "imes")
              .replace(/a/g, "ai")
              .replace(/o/g, "ober")
              .replace(/u/g, "ufat");
}

function decodificarTexto(texto) {
  return texto.replace(/enter/g, "e")
              .replace(/imes/g, "i")
              .replace(/ai/g, "a")
              .replace(/ober/g, "o")
              .replace(/ufat/g, "u");
}

function verificarTextoValido(textoOriginal) {
  const letrasMaiusculas = /[A-Z]/;
  const letrasAcentos = /[À-ÿ]/;

  if (letrasMaiusculas.test(textoOriginal) || letrasAcentos.test(textoOriginal)) {
    textoAviso.style.color = '#d73cbe';
    resetInterface();
    return false;
  }

  if (!textoOriginal.trim()) {
    alert('Por favor, insira um texto válido.');
    resetInterface();
    return false;
  }
  return true;
}

function displayAreaResultado(textoModificado, tituloVisivel, tituloOculto) {
  mensagemInicial.style.display = 'none';
  mensagemIndicador.style.display = 'none';
  imagemAreaResultado.style.display = 'none';
  textoAviso.style.color = '#191919';
  textoResultado.textContent = textoModificado;
  textoResultado.style.display = 'block';
  botaoCopiar.style.display = 'block';
  tituloOculto.style.display = 'none';
  tituloVisivel.style.display = 'block';
}

function temVogais(texto) {
  return /[aeiou]/.test(texto);
}

// Eventos
botaoCodificar.addEventListener('click', function(){
  let textoOriginal = document.querySelector('textarea').value.toLowerCase();

  if (!verificarTextoValido(textoOriginal)) return;

  if (!temVogais(textoOriginal)) {
    alert('O texto não pode ser codificado por não conter vogais.');
    limparTextarea();
    resetarInterface();
    return;
  }

  let textoModificado = codificarTexto(textoOriginal);

  if (verificarModificacao(textoOriginal, textoModificado)) return;

  displayAreaResultado(textoModificado, tituloTextoCodificado, tituloTextoDecodificado);
  limparTextarea();
});

botaoDecodificar.addEventListener('click', () => {
  let textoOriginal = document.querySelector('textarea').value.toLowerCase();

  if (!verificarTextoValido(textoOriginal)) return;

  let textoModificado = decodificarTexto(textoOriginal);

  if (verificarModificacao(textoOriginal, textoModificado)) return;

  displayAreaResultado(textoModificado, tituloTextoDecodificado, tituloTextoCodificado);
  limparTextarea();
});

botaoCopiar.addEventListener('click', function() {
  navigator.clipboard.writeText(textoResultado.textContent);
    alert('Texto copiado!');
    location.reload();
  });

