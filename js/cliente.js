function adicionarCliente(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const dataNascimento = document.getElementById('dataNascimento').value;
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = document.getElementById('endereco').value.trim();

  // Validação simples dos campos
  if (!nome || !dataNascimento || !telefone || !endereco) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  try {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    const novoCliente = {
      id: Date.now(),
      nome,
      dataNascimento,
      telefone,
      endereco
    };

    clientes.push(novoCliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    alert('Cliente cadastrado com sucesso!');
    document.getElementById('formCliente').reset();
    updateSelectOptions();
    mostrarClientes();
  } catch (error) {
    console.error('Erro ao salvar cliente:', error);
    alert('Ocorreu um erro ao salvar o cliente. Por favor, tente novamente.');
  }
}

function mostrarClientes() {
  const listaClientes = document.getElementById('listaClientes');
  listaClientes.innerHTML = '';

  try {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const fragment = document.createDocumentFragment();

    clientes.forEach(cliente => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = `${cliente.nome} - ${cliente.telefone}`;
      fragment.appendChild(li);
    });

    listaClientes.appendChild(fragment);
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
    alert('Ocorreu um erro ao carregar a lista de clientes. Por favor, tente novamente.');
  }
}
