
async function buscarDados() {

    const cpf = document.getElementById('cpfAtualizar').value.trim();

    if (cpf === '') {
        alert('Digite o CPF!');
        return;
    }

    try {

        const resposta = await fetch('/pessoas');

        if (!resposta.ok) {
            throw new Error('Erro ao consultar pessoas');
        }

        const dados = await resposta.json();

        const pessoaEncontrada = dados.find(pessoa =>
            String(pessoa.cpf).replace(/\D/g, '') === cpf.replace(/\D/g, '')
        );

        if (!pessoaEncontrada) {
            alert('CPF não encontrado!');
            return;
        }

        document.getElementById('identificador').value = pessoaEncontrada.id;
        document.getElementById('nomeAtualizar').value = pessoaEncontrada.nome || '';
        document.getElementById('sobrenomeAtualizar').value = pessoaEncontrada.sobrenome || '';
        document.getElementById('cpfAtualizar').value = pessoaEncontrada.cpf || '';
        document.getElementById('emailAtualizar').value = pessoaEncontrada.email || '';
        document.getElementById('senhaAtualizar').value = pessoaEncontrada.senha || '';
        document.getElementById('ruaAtualizar').value = pessoaEncontrada.rua || '';
        document.getElementById('cepAtualizar').value = pessoaEncontrada.cep || '';
        document.getElementById('cidadeAtualizar').value = pessoaEncontrada.cidade || '';
        document.getElementById('estadoAtualizar').value = pessoaEncontrada.estado || '';
        document.getElementById('telefoneAtualizar').value = pessoaEncontrada.telefone || '';

        alert('Pessoa encontrada!');

    } catch (erro) {
        alert('Erro ao buscar os dados!');
        console.error(erro);
    }
}


async function atualizarDados() {

    const id = document.getElementById('identificador').value;

    if (!id) {
        alert('Primeiro busque uma pessoa pelo CPF!');
        return;
    }

    const pessoa = {
        nome: document.getElementById('nomeAtualizar').value,
        sobrenome: document.getElementById('sobrenomeAtualizar').value,
        cpf: document.getElementById('cpfAtualizar').value,
        email: document.getElementById('emailAtualizar').value,
        senha: document.getElementById('senhaAtualizar').value,
        rua: document.getElementById('ruaAtualizar').value,
        cep: document.getElementById('cepAtualizar').value,
        cidade: document.getElementById('cidadeAtualizar').value,
        estado: document.getElementById('estadoAtualizar').value,
        telefone: document.getElementById('telefoneAtualizar').value
    };

    try {

        const resposta = await fetch(`/pessoas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pessoa)
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível atualizar');
        }

        alert('Informações atualizadas com sucesso!');

    } catch (erro) {
        alert('Erro ao atualizar os dados!');
        console.error(erro);
    }
}
