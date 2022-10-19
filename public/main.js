const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')


update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
        })
    })
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(response => {
            window.location.reload(true)
        })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(response => {
            if (response === 'No quote to delete') {
                messageDiv.textContent = 'No Darth Vader quote to delete'
            } else {
                window.location.reload(true)
            }
        })
    .catch(error => console.error(error))

})