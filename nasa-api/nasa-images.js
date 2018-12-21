//Udemy exercise, playing with fetch, native javascript DOM manipulation and ES6

var apiKey = '&api_key=0pBInYTfAommoMM3AgVsn3o1UKYAAASxnCLo2avX'
document.getElementById('load-indicator').style.display = "none"

function getNASAimages(event) {
  event.preventDefault()
  searchText = document.getElementById('form-input').value
  document.getElementsByClassName('image-search')[0].style.display = "none"
  document.getElementById('load-indicator').style.display = "block"
  fetch(`https://images-api.nasa.gov/search?q=${searchText}`)
    .then(function(r) {
      switch (r.status) {
        case 200:
          return r.json()
        case 400:
          console.log(r.status)
          break
        case 500:
          console.log(r.status)
          break
      }
    })
    .then(function(j) {
      showImages(j)
    })
    .catch(function(j) {
      console.log("oh no")
    })
}

function showImages(results) {
  console.log(results.collection.items[0].links[0].href)
  document.getElementsByClassName('image-search')[0].style.display = "block"
  document.getElementById('load-indicator').style.display = "none"
  results.collection.items.map ((item) => {
    let imageLink = document.createElement('a')
    imageLink.setAttribute(href, item.links[0].href)
    console.log(item.links[0].href)
  })


}
// https://api.nasa.gov/planetary/apod?
// fetchGitHubData('steve-dev90')

// function getGitHubData(event) {
//   event.preventDefault()
//   parent = document.getElementById('follower_info')
//   children = document.getElementsByTagName('li')
//   // Array.from converts array like object to an array
//   Array.from(children).map((child) => {parent.removeChild(child)})
//   name = document.getElementById('form-input').value
//   fetchGitHubData(name)
//   document.getElementById("form").reset()
// }

// function fetchGitHubData(name) {
//   document.getElementsByClassName('container')[0].style.display = "none"

//   fetch(`https://api.github.com/users/${name}`)
//     .then(function(r) {
//       return r.json();
//     })
//     .then(function(j) {
//       console.log(j);
//       document.getElementById('avatar').innerText = `Avatar: ${j.avatar_url}`;
//       document.getElementById('username').innerText = `Username: ${j.login}`;
//       document.getElementById('real-name').innerText = `Real-name: ${j.name}`;
//       document.getElementById('location').innerText = `Location:  ${j.login}`;
//       document.getElementById('bio').innerText = `Bio:  ${j.bio}`;
//       document.getElementById('followers').innerText = `Followers: ${j.followers}`;
//     })
//     .then(function() {
//       document.getElementById('load-indicator').style.display = "none"
//       document.getElementsByClassName('container')[0].style.display = "block"
//     })

//   fetch(`https://api.github.com/users/${name}/followers`)
//     .then(function(r) {
//       return r.json();
//     })
//     .then(function(j) {
//       console.log(j);
//       j.map(function(follower) {
//         var listItem = document.createElement('li')
//         var listText = document.createTextNode(`login: ${follower.login} avatar: ${follower.avatar_url}`)
//         document.getElementById('follower_info').appendChild(listItem)
//         listItem.appendChild(listText)
//       })
//     })
// }
