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

document.addEventListener("DOMContentLoaded", carregarEnderecos);

document.getElementById("adressBtn").addEventListener("click", () => {
    window.location.href = "cadastroendereco.html";
});
