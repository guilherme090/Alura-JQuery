// var frase = jQuery(".frase");

// usando atalho jQuery
// var frase = $(".frase");
// console.log(frase);
// console.log(frase[0].innerHTML);

var tempoInicial = $("#tempo-digitacao").text();

// $(document).ready(function(){
//     atualizaTamanhoFrase();
//     inicializaContadores();
//     inicializaCronometro();
//     $("#botao-reiniciar").click(reiniciaJogo);
// });

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    
    var numPalavras = frase.split(/\s+/).length;
    var tamanhoFrase = $("#tamanho-frase");
    
    tamanhoFrase.text(numPalavras);
}

var campo = $(".campo-digitacao");

function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var conteudoSemEspacos = conteudo.split(/\s+/).filter((item)=>{return(item != "")});
        $("#contador-caracteres").text(conteudoSemEspacos.join("").length);
        var qtdPalavras = conteudoSemEspacos.length;
        $("#contador-palavras").text(qtdPalavras);
    });
}

function inicializaCronometro(){
    $("#botao-reiniciar").attr("disabled", true);
    var tempoRestante = $("#tempo-digitacao");
    campo.one("focus", function(){
        var cronometroID = setInterval(function(){
            tempoRestante.text(tempoRestante.text() - 1);
            if(tempoRestante.text() < 1){
                campo.attr("disabled", true);
                $("#botao-reiniciar").attr("disabled", false);
                clearInterval(cronometroID);
                campo.toggleClass("campo-desativado");
                inserePlacar();
            }
        }, 1000);
    });
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function(){
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if(digitado == comparavel){
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

// $("#botao-reiniciar").on("click", function(){

// });

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
    inicializaCronometro();
}