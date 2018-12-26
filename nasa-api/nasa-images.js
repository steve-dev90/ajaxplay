//Udemy exercise, playing with fetch, native javascript DOM manipulation and ES6

var apiKey = '&api_key=0pBInYTfAommoMM3AgVsn3o1UKYAAASxnCLo2avX'
document.getElementById('load-indicator').style.display = "none"

function getNASAimages(event, searchText = 'Apollo') {
  event.preventDefault()
  searchText = document.getElementById('form-input').value || searchText
  fromStorage = localStorage.getItem(searchText)
  console.log(fromStorage)
  if (!fromStorage) {
    document.getElementById('load-indicator').style.display = "block"
    fetchResults(searchText)
  } else {
    console.log(fromStorage)
    showImages(fromStorage.json())
  }
}

function fetchResults(searchText) {
  fetch(`https://images-api.nasa.gov/search?q=${searchText}&media_type=image`)
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
      //Local storage key - value pairs must both be strings
      localStorage.setItem(searchText,j.stringify())
    })
    .catch(function(j) {
      console.log("oh no")
    })
}

function showError(error) {
  errorPara = document.createElement("p")
  errorMessage = document.createTextNode(`Status: ${error}`)
  document.getElementById("nasa-images").appendChild()

}

function showImages(results) {
  document.getElementsByClassName('image-search')[0].style.display = "block"
  document.getElementById('load-indicator').style.display = "none"
  results.collection.items.map((item) => {
    let { links, data, href } = item
    let imageDiv = document.createElement("div")
    let imageLink = document.createElement("img")
    imageLink.setAttribute("src", links[0].href)
    imageLink.setAttribute("onmouseover", "showCaption(event)")
    imageLink.setAttribute("onmouseleave", "hideCaption(event)")
    let imageCaption = document.createElement("p")
    imageCaption.style.display = "none"
    let caption = document.createTextNode(data[0].description || '')
    document.getElementById("nasa-images").appendChild(imageDiv)
    imageDiv.appendChild(imageLink)
    imageDiv.appendChild(imageCaption)
    imageCaption.appendChild(caption)
  })

}

function showCaption(event) {
  console.log(event.target.parentNode.getElementsByTagName('p'))
  event.target.parentNode.getElementsByTagName('p')[0].style.display = "block"
}

function hideCaption(event) {
  event.target.parentNode.getElementsByTagName('p')[0].style.display = "none"
}
