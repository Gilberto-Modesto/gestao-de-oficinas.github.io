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

  if (clientes.length === 0) {
      listaClientes.innerHTML = '<p>Nenhum cliente cadastrado.</p>';
      return;
  }

  const filterDiv = document.createElement('div');
  filterDiv.classList.add('filter-container', 'mb-3');

  ['Nome', 'Data de Nascimento', 'Telefone', 'Endereço'].forEach((headerText, index) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `Filtrar por ${headerText}`;
      input.classList.add('form-control', 'filter-input');
      input.dataset.column = index;
      filterDiv.appendChild(input);
  });

  listaClientes.appendChild(filterDiv);

  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  ['Nome', 'Data de Nascimento', 'Telefone', 'Endereço'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  clientes.forEach(cliente => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td>${cliente.nome}</td>
          <td>${cliente.dataNascimento}</td>
          <td>${cliente.telefone}</td>
          <td>${cliente.endereco}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editarCliente(${cliente.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="excluirCliente(${cliente.id})">Excluir</button>
          </td>
      `;
      tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  listaClientes.appendChild(table);

  document.querySelectorAll('.filter-input').forEach(input => {
      input.addEventListener('input', function() {
          const column = this.dataset.column;
          const value = this.value.toLowerCase();
          filterTable(tbody, column, value);
      });
  });
}

function filterTable(tbody, column, value) {
  Array.from(tbody.rows).forEach(row => {
      row.style.display = row.cells[column].textContent.toLowerCase().includes(value) ? '' : 'none';
  });
}

function editarCliente(clienteId) {
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const cliente = clientes.find(c => c.id === clienteId);

  if (cliente) {
    document.getElementById('editClienteId').value = cliente.id;
    document.getElementById('editNome').value = cliente.nome;
    document.getElementById('editDataNascimento').value = cliente.dataNascimento;
    document.getElementById('editTelefone').value = cliente.telefone;
    document.getElementById('editEndereco').value = cliente.endereco;

    $('#editClienteModal').modal('show');
  }
}

function atualizarCliente(event) {
  event.preventDefault();

  const clienteId = document.getElementById('editClienteId').value;
  const nome = document.getElementById('editNome').value;
  const dataNascimento = document.getElementById('editDataNascimento').value;
  const telefone = document.getElementById('editTelefone').value;
  const endereco = document.getElementById('editEndereco').value;

  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const clienteIndex = clientes.findIndex(c => c.id == clienteId);

  if (clienteIndex !== -1) {
    clientes[clienteIndex] = { id: clienteId, nome, dataNascimento, telefone, endereco };
    localStorage.setItem('clientes', JSON.stringify(clientes));
    alert('Cliente atualizado com sucesso!');
    $('#editClienteModal').modal('hide');
    mostrarClientes();
    updateSelectOptions();
  }
}

function excluirCliente(clienteId) {
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const updatedClientes = clientes.filter(c => c.id !== clienteId);

  localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  mostrarClientes();
}
