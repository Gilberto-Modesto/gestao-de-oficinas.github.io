function adicionarPeca() {
  const container = document.getElementById('pecas-container');
  const div = document.createElement('div');
  div.classList.add('form-group', 'd-flex', 'align-items-center');
  div.innerHTML = `
      <br>
      <input type="text" class="form-control mb-2 mr-2" placeholder="Nome da peça">
      <input type="number" class="form-control mb-2 mr-2" placeholder="Preço">
      <button type="button" class="btn btn-danger mb-2" onclick="removerPeca(this)">Remover</button>
  `;
  container.appendChild(div);
  repositionAddButton();
}

function removerPeca(button) {
  button.parentElement.remove();
  repositionAddButton();
}

function repositionAddButton() {
  const container = document.getElementById('pecas-container');
  const addButtonContainer = document.getElementById('add-remove-buttons');
  container.appendChild(addButtonContainer);
}

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
  resetPecasContainer();
  mostrarOrcamentos();
}

function resetPecasContainer() {
  const pecasContainer = document.getElementById('pecas-container');
  pecasContainer.innerHTML = '<label>Peças:</label>';
  repositionAddButton();
}

function mostrarOrcamentos() {
  const listaOrcamentos = document.getElementById('listaOrcamentos');
  listaOrcamentos.innerHTML = '';

  const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];

  orcamentos.forEach(orcamento => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = `Veículo ID: ${orcamento.veiculoId} - ${orcamento.descricaoServico} - R$${orcamento.valorTotal}`;
      listaOrcamentos.appendChild(li);
  });
}

window.onload = function() {
  updateSelectOptions();
  mostrarClientes();
  mostrarVeiculos();
  mostrarOrcamentos();

  $('.nav-link').on('click', function() {
      $('.nav-link').removeClass('active');
      $(this).addClass('active');
  });

  $('.navbar-nav .collapse').on('hide.bs.collapse', function() {
      $(this).prev('.nav-link').removeClass('active');
  });

  $('.navbar-nav .collapse').on('show.bs.collapse', function() {
      $('.navbar-nav .collapse.show').collapse('hide');
      $(this).prev('.nav-link').addClass('active');
  });
};
