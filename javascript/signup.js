
async function request(){
    const usernames = document.getElementById("username").value
    const emails = document.getElementById("email").value
    const passwords = document.getElementById("password").value
    
    const requestBody = {
        "username" : usernames,
        "email" : emails, 
        "password" : passwords
    }
    console.log(requestBody)
    const url = 'http://localhost:3000/user/signup'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
    })

    
    
}   