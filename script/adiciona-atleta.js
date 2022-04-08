var botãoAdicionaAtleta = document.getElementById("inserir");

function errorRemoval(){
    var removeError = document.querySelector('.error')
    if(removeError != null) {
        removeError.remove();
    }else {
        //do nothing
    }
}

function formError(message) {
    var spanError = document.createElement('span');
    spanError.textContent = `${message}`;
    spanError.classList.add('error');
    var inError = document.getElementById('pontos');
    inError.after(spanError);
}

botãoAdicionaAtleta.addEventListener('click', function(e){
    e.preventDefault();

    var form = document.querySelector("#registro");
    var nome = form.nome.value;
    var idade = form.idade.value;
    var modalidade = form.modalidade.value;
    var pontos = form.pontos.value;

    var atletaTr = document.createElement('tr');

    var nomeTd = document.createElement('td');
    var idadeTd = document.createElement('td');
    var modalidadeTd = document.createElement('td');
    var pontosTd = document.createElement('td');

    errorRemoval();

    if(idade == '' || nome == '' || modalidade == '' || pontos == '') {
        formError("Os campos não podem estar vazios");
    }else if (pontos > 100) {
        formError("A pontuação não pode ser maior que 100.");
    }else {
        nomeTd.textContent = nome;
        idadeTd.textContent = idade;
        modalidadeTd.textContent = modalidade;
        pontosTd.textContent = pontos;

        atletaTr.appendChild(nomeTd);
        atletaTr.appendChild(idadeTd);
        atletaTr.appendChild(modalidadeTd);
        atletaTr.appendChild(pontosTd);

        var tabelaAtletas = document.getElementById('tabela-atletas');
        tabelaAtletas.appendChild(atletaTr);

        form.reset();
    }
});