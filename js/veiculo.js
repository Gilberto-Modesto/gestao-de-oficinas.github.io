function adicionarVeiculo(event) {
  event.preventDefault();

  const clienteId = document.getElementById('clienteId').value;
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const ano = document.getElementById('ano').value;
  const placa = document.getElementById('placa').value;

  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];

  const novoVeiculo = {
      id: Date.now(),
      clienteId,
      marca,
      modelo,
      ano,
      placa
  };

  veiculos.push(novoVeiculo);
  localStorage.setItem('veiculos', JSON.stringify(veiculos));

  alert('Veículo cadastrado com sucesso!');
  document.getElementById('formVeiculo').reset();
  updateSelectOptions();
  mostrarVeiculos();
}

function mostrarVeiculos() {
  const listaVeiculos = document.getElementById('listaVeiculos');
  listaVeiculos.innerHTML = '';

  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];

  if (veiculos.length === 0) {
      listaVeiculos.innerHTML = '<p>Nenhum veículo cadastrado.</p>';
      return;
  }

  const filterDiv = document.createElement('div');
  filterDiv.classList.add('filter-container', 'mb-3');

  ['Cliente ID', 'Marca', 'Modelo', 'Ano', 'Placa'].forEach((headerText, index) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `Filtrar por ${headerText}`;
      input.classList.add('form-control', 'filter-input');
      input.dataset.column = index;
      filterDiv.appendChild(input);
  });

  listaVeiculos.appendChild(filterDiv);

  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  ['Cliente ID', 'Marca', 'Modelo', 'Ano', 'Placa'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  veiculos.forEach(veiculo => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td>${veiculo.clienteId}</td>
          <td>${veiculo.marca}</td>
          <td>${veiculo.modelo}</td>
          <td>${veiculo.ano}</td>
          <td>${veiculo.placa}</td>
      `;
      tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  listaVeiculos.appendChild(table);

  document.querySelectorAll('.filter-input').forEach(input => {
      input.addEventListener('input', function() {
          const column = this.dataset.column;
          const value = this.value.toLowerCase();
          filterTable(tbody, column, value);
      });
  });
}
