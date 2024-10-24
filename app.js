// Função para buscar dados e preencher a tabela
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/data');
    const data = await response.json();

    const tableBody = document.getElementById('data-table');
    tableBody.innerHTML = ''; // Limpar a tabela

    // Preencher a tabela com os dados
    data.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.cnpj}</td>
        <td>${row.empresa}</td>
        <td>${new Date(row.data_backup).toLocaleDateString()}</td>
        <td>${row.status}</td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Chama a função para buscar os dados quando a página for carregada
window.onload = fetchData;
