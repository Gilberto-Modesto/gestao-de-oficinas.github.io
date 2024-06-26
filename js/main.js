function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('d-none');
  });
  const activeSection = document.getElementById(sectionId);
  activeSection.classList.remove('d-none');
  activeSection.classList.add('fade-in');
}

function updateSelectOptions() {
  const clienteSelect = document.getElementById('clienteId');
  const veiculoSelect = document.getElementById('veiculoId');

  clienteSelect.innerHTML = '';
  veiculoSelect.innerHTML = '';

  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];

  if (Array.isArray(clientes)) {
    clientes.forEach(cliente => {
      const option = document.createElement('option');
      option.value = cliente.id;
      option.textContent = cliente.nome;
      clienteSelect.appendChild(option);
    });
  }

  if (Array.isArray(veiculos)) {
    veiculos.forEach(veiculo => {
      const option = document.createElement('option');
      option.value = veiculo.id;
      option.textContent = `${veiculo.marca} ${veiculo.modelo}`;
      veiculoSelect.appendChild(option);
    });
  }
}

function adicionarPeca() {
  const container = document.getElementById('pecas-container');
  const div = document.createElement('div');
  div.classList.add('form-group');
  div.innerHTML = `
    <input type="text" class="form-control mb-2" placeholder="Nome da peça" name="pecaNome">
    <input type="number" class="form-control mb-2" placeholder="Preço" name="pecaPreco">
  `;
  container.appendChild(div);
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
