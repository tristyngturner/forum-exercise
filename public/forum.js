const title = document.getElementById('userQuestion').value;
const content = document.getElementById('userContent').value;
const form = document.getElementById('thread');
const submit = document.getElementById('userSubmit');
const thread = document.getElementById('thread');

window.addEventListener('load', (event) => {
    event.preventDefault();
    axios.get('/api/posts').then(function(response) {
        console.log(response);
        forumPosts = response.data;
        forumPosts.forEach(function(forum) {
            document.getElementById('forumPost').innerHTML += `
            <div class="card">
                <div class="card-header">
                    ${forum.title}
                </div>
                <div class="card-body">
                <p class="card-text">${forum.post}</p>
                <p> Comments: </p>
                <ul>
                ${forum.comment.map(comment => `
                <li>${comment.comment}</li>
                `).join('')}
                </ul>
                <a href="/api/posts/${forum.id}" class="btn">View Comments</a>
            </div>
            </div>
            
        `
        })
        
    })
    
})


//need to add comments .map so they stay on homepage
/*
<h4>${forum.title}</h4>
            <p>${forum.post}</p>
            <p>Comments: </p>
            
            <a href="/api/posts/${forum.id}">View Comments</a>
*/
















