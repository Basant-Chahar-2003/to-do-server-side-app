async function addTodos(){
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const cookies = document.cookie.split('=')
    const actualCookie = cookies[1]

    const url = 'http://localhost:3000/user/addTodos'
    const respons = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : actualCookie,
            'username' : 'basant'

        },
        body: JSON.stringify({title, description}),
    })
}

async function allTodos(){
    const parent = document.createElement("div")
    const cookies = document.cookie.split('=')
    const actualCookie = cookies[1]

    const url = 'http://localhost:3000/user/getTodos'
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : actualCookie,
            'username' : 'basant'

        },
    }).then(response => response.json())
    .then(data => {
        var todoContainer = document.getElementById('todocontainer');

        // Loop through the todos array
        data.msg.forEach(function(todo) {
            // Create a new div element for each todo
            var todoDiv = document.createElement('div');
            todoDiv.textContent = 'Title ' +todo.title + ' Description '+todo.description;
    
            // Append the todo div to the container
            todoContainer.appendChild(todoDiv);
        });   
    })

    
}