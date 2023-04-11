const form = document.getElementById('form-atividade')
const imgAprovado = '<img src="./images/aprovado.png"  alt="Emoji Celebrando"/>'
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji Decepcionado"/>'
let linhas= ''
//arrays de atividades e  notas
const atividades = [];
const notas = [];

const spanAprovado = '<span class="resultado aprovado"> Aprovado </span>'
const spanReprovado = '<span class="resultado reprovado"> Reprovado </span>'

//Insere a nota minima corte para aprovação personalizada
let notaMinima = parseFloat(prompt('Digite a Nota Mínima para Aprovação'))

form.addEventListener('submit', function(e){
    e.preventDefault()
    adicionaLinha()
    atualizaTabela()
    atualizaMediaFinal()


})

function adicionaLinha(){
    //pego os conteúdos
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    //não colocar atividades duplicadas
    if(atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);

    }else{
        //preenche informações nos arrays
        atividades.push(inputNomeAtividade.value)
        notas.push(parseFloat(inputNotaAtividade.value))

        //monto a linha da minha tabela com cada célula
        let linha = '<tr>';
        linha += `<td> ${inputNomeAtividade.value} </td>`
        linha += `<td> ${inputNotaAtividade.value} </td>`
        //Operador ternário
        linha += `<td> ${inputNotaAtividade.value >= notaMinima ? imgAprovado: imgReprovado} </td>`
        linha += '</tr>'

        //para não sumir da tela o conteudo a cada atualização, vou salvando a string
        linhas+= linha     
    }

    //ao final zero o formulário para a entrada de uma nova informação
    inputNomeAtividade.value='';
    inputNotaAtividade.value ='';
}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody')
    // e adciono as linhas no body da table
    corpoTabela.innerHTML = linhas
}

function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal()
   //console.log(media)
   document.getElementById('media-final-valor').innerHTML = mediaFinal
   document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima? spanAprovado : spanReprovado
}

function calculaMediaFinal(){
    let somaNotas = 0
    for (let i = 0; i <notas.length; i++){
        somaNotas += notas[i]
    } 
    //console.log(somaNotas)
    return (somaNotas/notas.length).toFixed(2)
   
}

