document.addEventListener('DOMContentLoaded', function() {
  mostrarOrcamentos();
});

function adicionarOrcamento(event) {
  event.preventDefault();

  const veiculoId = document.getElementById('veiculoId').value;
  const descricaoServico = document.getElementById('descricaoServico').value;
  const pecas = Array.from(document.querySelectorAll('#pecas-container .form-group')).map(group => {
      const nomePeca = group.children[0].value;
      const preco = parseFloat(group.children[1].value);
      return { nomePeca, preco };
  });
  const valorTotal = document.getElementById('valorTotal').value;

  const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];

  const novoOrcamento = {
      id: Date.now(),
      veiculoId,
      descricaoServico,
      pecas,
      valorTotal
  };

  orcamentos.push(novoOrcamento);
  localStorage.setItem('orcamentos', JSON.stringify(orcamentos));

  alert('Orçamento cadastrado com sucesso!');
  document.getElementById('formOrcamento').reset();
  mostrarOrcamentos();
}

function mostrarOrcamentos() {
  const listaOrcamentos = document.getElementById('listaOrcamentos');
  listaOrcamentos.innerHTML = '';

  const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];

  if (orcamentos.length === 0) {
      listaOrcamentos.innerHTML = '<p>Nenhum orçamento cadastrado.</p>';
      return;
  }

  const filterDiv = document.createElement('div');
  filterDiv.classList.add('filter-container', 'mb-3');

  ['ID do Veículo', 'Descrição do Serviço', 'Peças', 'Valor Total'].forEach((headerText, index) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `Filtrar por ${headerText}`;
      input.classList.add('form-control', 'filter-input');
      input.dataset.column = index;
      filterDiv.appendChild(input);
  });

  listaOrcamentos.appendChild(filterDiv);

  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  ['Veículo ID', 'Descrição do Serviço', 'Peças', 'Valor Total', 'Ações'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  orcamentos.forEach(orcamento => {
      const tr = document.createElement('tr');
      const pecasList = orcamento.pecas.map(peca => `${peca.nomePeca} (R$${peca.preco})`).join(', ');
      tr.innerHTML = `
          <td>${orcamento.veiculoId}</td>
          <td>${orcamento.descricaoServico}</td>
          <td>${pecasList}</td>
          <td>R$${orcamento.valorTotal}</td>
          <td>
              <button class="btn btn-warning btn-sm" onclick="editarOrcamento(${orcamento.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="excluirOrcamento(${orcamento.id})">Excluir</button>
          </td>
      `;
      tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  listaOrcamentos.appendChild(table);

  document.querySelectorAll('.filter-input').forEach(input => {
      input.addEventListener('input', function() {
          const column = this.dataset.column;
          const value = this.value.toLowerCase();
          filterTable(tbody, column, value);
      });
  });
}

function editarOrcamento(orcamentoId) {
  const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
  const orcamento = orcamentos.find(o => o.id === orcamentoId);

  if (orcamento) {
      document.getElementById('editOrcamentoId').value = orcamento.id;
      document.getElementById('editVeiculoId').value = orcamento.veiculoId;
      document.getElementById('editDescricaoServico').value = orcamento.descricaoServico;
      document.getElementById('editPecas').value = orcamento.pecas.map(peca => `${peca.nomePeca}:${peca.preco}`).join(', ');
      document.getElementById('editValorTotal').value = orcamento.valorTotal;

      $('#editOrcamentoModal').modal('show');
  }
}

function atualizarOrcamento(event) {
  event.preventDefault();

  const orcamentoId = document.getElementById('editOrcamentoId').value;
  const veiculoId = document.getElementById('editVeiculoId').value;
  const descricaoServico = document.getElementById('editDescricaoServico').value;
  const pecasInput = document.getElementById('editPecas').value;
  const pecas = pecasInput.split(',').map(pecaStr => {
      const [nomePeca, preco] = pecaStr.split(':');
      return { nomePeca: nomePeca.trim(), preco: parseFloat(preco.trim()) };
  });
  const valorTotal = document.getElementById('editValorTotal').value;

  const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
  const orcamentoIndex = orcamentos.findIndex(o => o.id == orcamentoId);

  if (orcamentoIndex !== -1) {
      orcamentos[orcamentoIndex] = { id: orcamentoId, veiculoId, descricaoServico, pecas, valorTotal };
      localStorage.setItem('orcamentos', JSON.stringify(orcamentos));
      alert('Orçamento atualizado com sucesso!');
      $('#editOrcamentoModal').modal('hide');
      mostrarOrcamentos();
  }
}

function excluirOrcamento(orcamentoId) {
  const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
  const updatedOrcamentos = orcamentos.filter(o => o.id !== orcamentoId);

  localStorage.setItem('orcamentos', JSON.stringify(updatedOrcamentos));
  mostrarOrcamentos();
}

function filterTable(tbody, column, value) {
  Array.from(tbody.rows).forEach(row => {
      row.style.display = row.cells[column].textContent.toLowerCase().includes(value) ? '' : 'none';
  });
}
