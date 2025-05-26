document.getElementById("formEndereco").addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const cep = document.getElementById("cep").value;
    const endereco = document.getElementById("endereco").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;

    const user = JSON.parse(localStorage.getItem("userData"));

    try {
      const response = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({
          title: titulo,
          cep: cep,
          address: endereco,
          number: numero,
          complement: complemento,
        }),
      });

      if (response.ok) {
        alert("Endereço cadastrado com sucesso!");
        window.location.href = "endereco.html";
      } else {
        const erro = await response.json();
        alert("Erro ao cadastrar: " + erro.message);
      }
    } catch (error) {
      alert("Erro inesperado: " + error.message);
    }
  });