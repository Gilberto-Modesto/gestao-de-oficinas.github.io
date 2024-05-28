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

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    });
  });

  document.querySelectorAll('.navbar-nav .collapse').forEach(collapse => {
    collapse.addEventListener('hide.bs.collapse', function() {
      this.previousElementSibling.classList.remove('active');
    });

    collapse.addEventListener('show.bs.collapse', function() {
      document.querySelectorAll('.navbar-nav .collapse.show').forEach(show => show.classList.remove('show'));
      this.previousElementSibling.classList.add('active');
    });
  });
};
