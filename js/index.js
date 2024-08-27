document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('github-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value;
    searchUsers(searchTerm);
  });

  function searchUsers(query) {
    const url = `https://api.github.com/search/users?q=${query}`;
    fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => displayUserResults(data.items))
    .catch(error => console.error('Error:', error));
  }

  function displayUserResults(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear any previous results

    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}'s avatar" width="50">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
        <button>View Repos</button>
      `;
      const button = li.querySelector('button');
      button.addEventListener('click', () => fetchUserRepos(user.login));
      userList.appendChild(li);
    });
  }

  function fetchUserRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => displayRepoResults(data))
    .catch(error => console.error('Error:', error));
  }

  function displayRepoResults(repos) {
    const repoList = document.getElementById('repos-list');
    repoList.innerHTML = ''; // Clear any previous results

    repos.forEach(repo => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || 'No description available'}</p>
      `;
      repoList.appendChild(li);
    });
  }
});
