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
document.addEventListener('DOMContentLoaded', function() {
  mostrarVeiculos();
});
document.addEventListener('DOMContentLoaded', function() {
  mostrarVeiculos();
});

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

  ['Marca', 'Modelo', 'Ano', 'Placa'].forEach((headerText, index) => {
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

  ['Placa', 'Marca', 'Modelo', 'Ano' ].forEach(headerText => {
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
          <td>${veiculo.placa}</td>
          <td>${veiculo.marca}</td>
          <td>${veiculo.modelo}</td>
          <td>${veiculo.ano}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editarVeiculo(${veiculo.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="excluirVeiculo(${veiculo.id})">Excluir</button>
          </td>
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

function editarVeiculo(veiculoId) {
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  const veiculo = veiculos.find(v => v.id === veiculoId);

  if (veiculo) {
      document.getElementById('editVeiculoId').value = veiculo.id;
      document.getElementById('editPlaca').value = veiculo.placa;
      document.getElementById('editMarca').value = veiculo.marca;
      document.getElementById('editModelo').value = veiculo.modelo;
      document.getElementById('editAno').value = veiculo.ano;

      $('#editVeiculoModal').modal('show');
  }
}

function atualizarVeiculo(event) {
  event.preventDefault();

  const veiculoId = document.getElementById('editVeiculoId').value;
  const placa = document.getElementById('editPlaca').value;
  const marca = document.getElementById('editMarca').value;
  const modelo = document.getElementById('editModelo').value;
  const ano = document.getElementById('editAno').value;

  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  const veiculoIndex = veiculos.findIndex(v => v.id == veiculoId);

  if (veiculoIndex !== -1) {
      veiculos[veiculoIndex] = { id: veiculoId, placa, marca, modelo, ano };
      localStorage.setItem('veiculos', JSON.stringify(veiculos));
      alert('Veículo atualizado com sucesso!');
      $('#editVeiculoModal').modal('hide');
      mostrarVeiculos();
  }
}

function excluirVeiculo(veiculoId) {
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  const updatedVeiculos = veiculos.filter(v => v.id !== veiculoId);

  localStorage.setItem('veiculos', JSON.stringify(updatedVeiculos));
  mostrarVeiculos();
}

function filterTable(tbody, column, value) {
  const rows = tbody.getElementsByTagName('tr');
  for (let row of rows) {
      const cell = row.getElementsByTagName('td')[column];
      if (cell) {
          const text = cell.textContent || cell.innerText;
          row.style.display = text.toLowerCase().indexOf(value) > -1 ? '' : 'none';
      }
  }
}
