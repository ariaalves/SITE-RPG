document.getElementById("loginBtn").addEventListener("click",async () => {
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


            if (response.ok){ 
                const responseData = await response.json();   
                alert("Login feito com sucesso!");
                localStorage.setItem('userData', JSON.stringify(responseData));
                getUserData()
                window.location.href = "endereco.html"
                // form.reset();

            }

            function getUserData(){
                let user = JSON.parse(localStorage.getItem("userData"))
                console.log(user.access_token)
            }
           

            // if (!response.ok) {
            //         throw new Error(responseData.message || "Erro ao fazer login!")
                    
            // }


           

        } catch (error) {
            alert(error.message);  
        }
    });
    
});