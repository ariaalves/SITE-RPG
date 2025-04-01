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

        const emailError = document.getElementById("emailError");
        const cpfError = document.getElementById("cpfError");
        const message = document.getElementById("message");

        emailError.textContent = "";
        cpfError.textContent = "";
        message.textContent = "";

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

            const data = await response.json();

            if (!response.ok) {
                if (data.message.includes("email")) {
                    emailError.textContent = "E-mail já cadastrado";
                }
                if (data.message.includes("cpf")) {
                    cpfError.textContent = "CPF já cadastrado";
                }
                return;
            }

            message.textContent = "Cadastro realizado com sucesso!";
            message.style.color = "green";

    
            form.reset();
            registerBtn.disabled = true;

        } catch (error) {
            message.textContent = "Erro ao cadastrar. Tente novamente.";
            message.style.color = "red";
        }
    });
});
