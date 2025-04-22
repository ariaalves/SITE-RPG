document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("https://go-wash-api.onrender.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    user_type_id: 1, 
                    password,
                }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                    throw new Error(responseData.message || "Erro ao fazer login!") 
            }

            alert("Login feito com sucesso!");
            form.reset();

        } catch (error) {
            alert(error.message);  
        }
    });
    
});