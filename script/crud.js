let d = document,
    $table = d.getElementById('crud-table'),
    $form = d.getElementById('crud-form'),
    $title = d.getElementById('crud-title')
$template = d.getElementById('crud-template').content,
    $fragment = d.createDocumentFragment();

function formError(message) {
    var spanError = document.createElement('span');
    spanError.textContent = `${message}`;
    spanError.classList.add('error');
    var inError = document.getElementById('pontos');
    inError.after(spanError);
}

const ajax = (options) => {
    let { url, method, success, error, data } = options;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', e => {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            success(json);
        } else {
            let message = xhr.statusText || 'Ocorreu um erro';
            error(`Erro ${xhr.status} : ${message}`);
            // error('Erro' + xhr.status + ':' + message);
        }
    });

    xhr.open(method || 'GET', url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(data));
}

const getAll = () => {
    ajax({
        url: 'http://localhost:3000/atletas',
        success: (res) => {
            console.log(res);

            res.forEach(el => {
                $template.querySelector('.nome').textContent = el.nome;
                $template.querySelector('.idade').textContent = el.idade;
                $template.querySelector('.modalidade').textContent = el.modalidade;
                $template.querySelector('.pontos').textContent = el.pontos;
                // para editar
                $template.querySelector('.edit').dataset.id = el.id;
                $template.querySelector('.edit').dataset.nome = el.nome;
                $template.querySelector('.edit').dataset.idade = el.idade;
                $template.querySelector('.edit').dataset.modalidade = el.modalidade;
                $template.querySelector('.edit').dataset.pontos = el.pontos;
                // para excluir
                $template.querySelector('.delete').dataset.id = el.id;
                $template.querySelector('.delete').dataset.nome = el.nome;

                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);
            });
            $table.querySelector('tbody').appendChild($fragment);
        },
        error: (err) => {
            console.log(err);
        }
    });
}

d.addEventListener('DOMContentLoaded', getAll)

// Submit e Cancel
d.addEventListener('submit', e => {
    if ($('.error') != null) {
        $('.error').remove();
    }
    if (e.target.idade.value > 100 || e.target.idade.value < 0) {
        formError('A idade não pode ser maior ou menor que 100')
        e.preventDefault();
    } else if (e.target.pontos.value > 100 || e.target.pontos.value < 0) {
        formError('A pontuação não pode ser maior ou menor que 100');
        e.preventDefault();
    } else {
        if (e.target === $form) {
            e.preventDefault();
        }

        if (!e.target.id.value) {
            // método POST
            ajax({
                url: 'http://localhost:3000/atletas',
                method: 'POST',
                success: (res) => location.reload(),
                error: (res) => console.log(err),
                data: {
                    nome: e.target.nome.value,
                    idade: e.target.idade.value,
                    modalidade: e.target.modalidade.value,
                    pontos: e.target.pontos.value
                }
            });
        } else {
            // update
            ajax({
                url: `http://localhost:3000/atletas/${e.target.id.value}`,
                method: 'PUT',
                success: (res) => location.reload(),
                error: (res) => console.log(err),
                data: {
                    nome: e.target.nome.value,
                    idade: e.target.idade.value,
                    modalidade: e.target.modalidade.value,
                    pontos: e.target.pontos.value
                }
            });
        }
    }
});
d.addEventListener('reset', () => {
    location.reload()
});

// Edit e Delete
d.addEventListener('click', e => {
    if (e.target.matches('.edit')) {
        $title.textContent = 'Editar dados do atleta';
        $form.nome.value = e.target.dataset.nome;
        $form.idade.value = e.target.dataset.idade;
        $form.modalidade.value = e.target.dataset.modalidade;
        $form.pontos.value = e.target.dataset.pontos;
        $form.id.value = e.target.dataset.id;
        console.table(e.target.dataset);
    }
    if (e.target.matches('.delete')) {
        let isDelete = confirm(`Deseja deletar o atleta ${e.target.dataset.nome}?`)

        if (isDelete) {
            ajax({
                url: `http://localhost:3000/atletas/${e.target.dataset.id}`,
                method: 'DELETE',
                success: (res) => alert("Cadastro excluido com sucesso."),
                error: (res) => {
                    e.preventDefault();
                    alert(err);
                },
            });
        }
    }
});