function adicionarCliente(event) {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
  
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
  }
  
  function mostrarClientes() {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';
  
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  
    clientes.forEach(cliente => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = `${cliente.nome} - ${cliente.telefone}`;
      listaClientes.appendChild(li);
    });
  }
  