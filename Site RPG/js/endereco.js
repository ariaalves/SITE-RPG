document.addEventListener("DOMContentLoaded", carregarEnderecos);

document.getElementById("adressBtn").addEventListener("click", () => {
  window.location.href = "cadastroendereco.html";
});

async function carregarEnderecos() {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user || !user.access_token) {
    alert("Usuário não autenticado.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
      headers: {
        "Authorization": `Bearer ${user.access_token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const enderecos = data.data;

      localStorage.setItem("enderecos", JSON.stringify(enderecos));

      const tabela = document.querySelector("#tabelaEnderecos tbody");
      tabela.innerHTML = "";

      enderecos.forEach((endereco) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${endereco.title}</td>
          <td>${endereco.cep}</td>
          <td>${endereco.address}</td>
          <td>${endereco.number}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editarEndereco(${endereco.id})">Atualizar</button>
            <button class="btn btn-danger btn-sm" onclick="deletarEndereco(${endereco.id})">Deletar</button>
          </td>
        `;
        tabela.appendChild(linha);
      });
    } else {
      alert("Erro ao buscar endereços.");
    }
  } catch (error) {
    console.error("Erro ao carregar endereços:", error);
    alert("Erro inesperado.");
  }
}

function editarEndereco(id) {
 
  const enderecos = JSON.parse(localStorage.getItem("enderecos")) || [];
  const endereco = enderecos.find(e => e.id === id);

  if (endereco) {

    localStorage.setItem("enderecoEdit", JSON.stringify(endereco));
    window.location.href = "editarendereco.html";
  } else {
    alert("Endereço não encontrado.");
  }
}

async function deletarEndereco(id) {
  const user = JSON.parse(localStorage.getItem("userData"));
  if (!user || !user.access_token) {
    alert("Usuário não autenticado.");
    return;
  }

  if (!confirm("Tem certeza que deseja deletar este endereço?")) return;

  try {
    const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.access_token}`
      }
    });

    if (response.ok) {
      alert("Endereço deletado com sucesso!");
      carregarEnderecos();
    } else {
      alert("Erro ao deletar endereço.");
    }
  } catch (error) {
    console.error("Erro ao deletar:", error);
    alert("Erro inesperado.");
  }
}