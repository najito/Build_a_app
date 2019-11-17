//global things that need to be accessed
const messageList = document.getElementById('message-list')
let length = 0;
const textField = document.getElementById('desc')
const passField = document.getElementById('pass')
const saveInput = document.getElementById('save')

//making items on the list could be made into a function
const messageFunction = (messages) => {
    messages.forEach((element) => {
        const listItem = document.createElement('li')
        listItem.innerText = element.message
        //I couldn't think of another way to store the id from mongoose
        listItem.setAttribute('id', `${element._id}`)
        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('class','del')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click', () => {
            fetch('/messages', {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: listItem.getAttribute('id'),
                })
            })
            .then(resp => resp.text())
            .then(data => {
                //sends back "invalid password" if incorrect cookies
                deleteButton.innerText = data
                if (data === 'OK') {
                    listItem.remove()
                }
            })
            .catch(err => console.log(err))
        })
        listItem.appendChild(deleteButton)
        messageList.appendChild(listItem)
    });
}

//start by getting all the messages in the database
fetch('/messages')
.then(resp => resp.json())
.then(data => {
    const dbMessages = data.messages;
    messageFunction(dbMessages)
    length = dbMessages.length
})
.catch(err => console.log(err))

//check every two seconds after that and only use the messages that came in after
setInterval(() => {
    fetch('/messages')
    .then(resp => resp.json())
    .then(data => {
        const dbMessages = data.messages
        //slicing the methods means I only run the function on the new messages
        const newMessages = dbMessages.slice(length)
        messageFunction(newMessages)
        length = dbMessages.length
    })
    .catch(err => console.log(err))
}, 2000)


//adding messages
saveInput.addEventListener('click', () => {
    if (textField.value === '') {
        saveInput.innerText = 'need valid message'
    } 
    //there isn't an else because the models would block an empty value going in on the backend
    fetch('/messages', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            message: textField.value,
	        password: passField.value,
        })
    })
    .catch(err => console.log(err))
})