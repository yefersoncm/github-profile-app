const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const numRepos = 7;
getUser('yefersoncm');

async function getUser(username){
    const response = await fetch(APIURL + username);
    const respData = await response.json();

    
    createUserCard(respData); 
    
    getRepos(username);
}

async function getRepos(username){
    const response = await fetch(APIURL + username + '/repos');
    const respData = await response.json();

    addReposToCard(respData);
}

function createUserCard(user){
    const cardHTML = `
        <div class="card"
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
            
                <div class="user-info">
                    <h2>${user.name}</h2>
                    <p>${user.bio}</p>
                    <ul class="info">
                        <li>${user.followers}<strong>Followers</strong></li>
                        <li>${user.following}<strong>Following</strong></li>
                        <li>${user.public_repos}<strong>Repos</strong></li>
                    </ul>
                    <div id="repos">
                    </div>
                </div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}
function addReposToCard(repos){
    const reposE1 = document.getElementById('repos');
    repos
        .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)).slice(0, numRepos)
        .forEach(repo =>{
            console.log(Date.parse(repo.created_at));
        const repoE1 = document.createElement('a');
        repoE1.classList.add('repo');
        repoE1.href = repo.html_url;
        repoE1.target = "_blank";
        repoE1.innerHTML = repo.name;
        reposE1.appendChild(repoE1);
    });
}
form.addEventListener('submit',  function(e) {
    e.preventDefault();

    const user = search.value;
    
    if(user){
        getUser(user);

        search.value = "";

    }
});