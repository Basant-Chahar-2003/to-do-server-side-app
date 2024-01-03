async function signinfunc(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    fetch('http://localhost:3000/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },body: JSON.stringify({ username, password }),
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then(data => {
        document.cookie = 'jwt='+ data.token;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    location.replace('../html/todos.html')

}   

function main() {
  
}


