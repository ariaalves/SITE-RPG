document.addEventListener("DOMContentLoaded", () => {
    const endereco = JSON.parse(localStorage.getItem("enderecoEdit"));
    if (!endereco) {
        alert("Endereço não encontrado.");
        window.location.href = "endereco.html";
        return;
    }

    document.getElementById("enderecoId").value = endereco.id;
    document.getElementById("title").value = endereco.title;
    document.getElementById("cep").value = endereco.cep;
    document.getElementById("address").value = endereco.address;
    document.getElementById("number").value = endereco.number;
    document.getElementById("complement").value = endereco.complement || "";
});

document.getElementById("formEditarEndereco").addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("userData"));
    if (!user || !user.access_token) {
        alert("Usuário não autenticado.");
        return;
    }

    const id = document.getElementById("enderecoId").value;
    const enderecoAtualizado = {
        title: document.getElementById("title").value,
        cep: document.getElementById("cep").value,
        address: document.getElementById("address").value,
        number: document.getElementById("number").value,
        complement: document.getElementById("complement").value
    };

    try {
        const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.access_token}`
            },
            body: JSON.stringify(enderecoAtualizado)
        });

        if (response.ok) {
            alert("Endereço atualizado com sucesso!");

            const lista = JSON.parse(localStorage.getItem("enderecos")) || [];
            const index = lista.findIndex(e => e.id === id);
            if (index !== -1) {
                lista[index] = { id, ...enderecoAtualizado };
                localStorage.setItem("enderecos", JSON.stringify(lista));
            }

            localStorage.removeItem("enderecoEdit");
            window.location.href = "endereco.html";
        } else {
            alert("Erro ao atualizar o endereço.");
        }
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        alert("Erro inesperado.");
    }
});