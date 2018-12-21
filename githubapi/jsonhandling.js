//Udemy exercise, playing with fetch and native javascript DOM manipulation

fetchGitHubData('steve-dev90')

function getGitHubData(event) {
  event.preventDefault()
  parent = document.getElementById('follower_info')
  children = document.getElementsByTagName('li')
  // Array.from converts array like object to an array
  Array.from(children).map((child) => {parent.removeChild(child)})
  name = document.getElementById('form-input').value
  fetchGitHubData(name)
  document.getElementById("form").reset()
}

function fetchGitHubData(name) {
  document.getElementsByClassName('container')[0].style.display = "none"

  fetch(`https://api.github.com/users/${name}`)
    .then(function(r) {
      return r.json();
    })
    .then(function(j) {
      console.log(j);
      document.getElementById('avatar').innerText = `Avatar: ${j.avatar_url}`;
      document.getElementById('username').innerText = `Username: ${j.login}`;
      document.getElementById('real-name').innerText = `Real-name: ${j.name}`;
      document.getElementById('location').innerText = `Location:  ${j.login}`;
      document.getElementById('bio').innerText = `Bio:  ${j.bio}`;
      document.getElementById('followers').innerText = `Followers: ${j.followers}`;
    })
    .then(function() {
      document.getElementById('load-indicator').style.display = "none"
      document.getElementsByClassName('container')[0].style.display = "block"
    })

  fetch(`https://api.github.com/users/${name}/followers`)
    .then(function(r) {
      return r.json();
    })
    .then(function(j) {
      console.log(j);
      j.map(function(follower) {
        var listItem = document.createElement('li')
        var listText = document.createTextNode(`login: ${follower.login} avatar: ${follower.avatar_url}`)
        document.getElementById('follower_info').appendChild(listItem)
        listItem.appendChild(listText)
      })
    })
}
