document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const termsCheckbox = document.getElementById("terms");
    const registerBtn = document.getElementById("registerBtn");

    termsCheckbox.addEventListener("change", () => {
        registerBtn.disabled = !termsCheckbox.checked;
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const password = document.getElementById("password").value;
        const birthday = document.getElementById("birthday").value;
   

        try {
            const response = await fetch("https://go-wash-api.onrender.com/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    user_type_id: 1, 
                    password,
                    cpf_cnpj: cpf,
                    terms: 1, 
                    birthday
                }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                const errorMessage = responseData.message || "Erro ao processar a solicitação.";
                if (response.status === 422) {
                    throw new Error("Usuário já cadastrado! Tente novamente.");
                } else {
                    throw new Error(errorMessage);
                }
            }

            alert("Cadastro realizado com sucesso!");
            form.reset();
            registerBtn.disabled = true;

        } catch (error) {
            alert(error.message);  
        }
    });
});
