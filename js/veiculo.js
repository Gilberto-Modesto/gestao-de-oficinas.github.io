function adicionarVeiculo(event) {
  event.preventDefault();

  const clienteId = document.getElementById('clienteId').value;
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const ano = document.getElementById('ano').value;
  const placa = document.getElementById('placa').value;

  if (!clienteId || !marca || !modelo || !ano || !placa) {
      alert('Por favor, preencha todos os campos.');
      return;
  }

  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];

  if (veiculos.some(veiculo => veiculo.placa === placa)) {
      alert('Um veículo com esta placa já está cadastrado.');
      return;
  }

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
  const veiculosOrdenados = veiculos.sort((a, b) => a.marca.localeCompare(b.marca));

  veiculosOrdenados.forEach(veiculo => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = `${veiculo.marca} ${veiculo.modelo} - ${veiculo.placa}`;
      listaVeiculos.appendChild(li);
  });
}
