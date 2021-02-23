const button = document.getElementById('commentButton');

button.addEventListener('click', (event) => {
    event.preventDefault();
    axios.get('api/posts/:id/comment').then(function(response) {
        console.log(response);
    })
})
