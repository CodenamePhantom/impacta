let d = document,
    $table = d.getElementById('crud-table'),
    $form = d.getElementById('crud-form'),
    $title = d.getElementById('crud-title')
    $template = d.getElementById('crud-template').content,
    $fragment = d.createDocumentFragment();

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

                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone)
            });
            $table.querySelector('tbody').appendChild($fragment);
        },
        error: (err) => {
            console.log(err);
        }
    });
}

d.addEventListener('DOMContentLoaded', getAll)

//submit
d.addEventListener('submit', e => {
    if(e.target === $form) {
        e.preventDefault();
    }

    if(!e.target.id.value) {
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
})