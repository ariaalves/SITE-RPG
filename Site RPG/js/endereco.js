async function carregarEnderecos() {
    const user = JSON.parse(localStorage.getItem("userData"));

    if (!user || !user.access_token) {
        alert("Usuário não autenticado.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.access_token}`
            }
        });

        if (response.ok) {
            const resposta = await response.json();
            const enderecos = resposta.data;

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
                        <button onclick="atualizarEndereco('${endereco.id}')" class="btn btn-outline-primary">Atualizar</button>
                        <button onclick="deletarEndereco('${endereco.id}')" class="btn btn-outline-danger">Deletar</button>
                    </td>
                `;
                tabela.appendChild(linha);
            });
        } else {
            alert("Erro ao buscar endereços!");
        }
    } catch (error) {
        console.error("Erro ao carregar endereços:", error);
        alert("Erro inesperado.");
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


function atualizarEndereco(id) {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (!user || !user.access_token) {
        alert("Usuário não autenticado.");
        return;
    }

    fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${user.access_token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("enderecoEdit", JSON.stringify(data.data));
            window.location.href = "editarendereco.html";
        })
        .catch(err => {
            console.error("Erro ao buscar endereço:", err);
            alert("Erro ao carregar dados do endereço.");
        });
}


document.addEventListener("DOMContentLoaded", carregarEnderecos);

document.getElementById("adressBtn").addEventListener("click", () => {
    window.location.href = "cadastroendereco.html";
});
