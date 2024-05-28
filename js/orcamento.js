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
  
    orcamentos.forEach(orcamento => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = `Veículo ID: ${orcamento.veiculoId} - ${orcamento.descricaoServico} - R$${orcamento.valorTotal}`;
      listaOrcamentos.appendChild(li);
    });
  }
  