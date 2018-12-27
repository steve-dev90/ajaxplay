//Udemy exercise, playing with fetch, native javascript DOM manipulation and ES6

var apiKey = '&api_key=0pBInYTfAommoMM3AgVsn3o1UKYAAASxnCLo2avX'
document.getElementById('load-indicator').style.display = "none"

function getNASAimages(event, searchText = 'Apollo') {
  event.preventDefault()
  searchText = document.getElementById('form-input').value || searchText
  fromStorage = JSON.parse(localStorage.getItem(searchText))
  if (!fromStorage) {
    document.getElementById('load-indicator').style.display = "block"
    fetchResults(searchText)
  } else {
    showImages(fromStorage)
  }
}

function fetchResults(searchText) {
  fetch(`https://images-api.nasa.gov/search?q=${searchText}&media_type=image`)
    .then(function(r) {
      switch (r.status) {
        case 200:
          return r.json()
        case 400:
          showError(r.status)
          break
        case 500:
          showError(r.status)
          break
      }
    })
    .then(function(j) {
      showImages(j)
      //Local storage key - value pairs must both be strings
      localStorage.setItem(searchText,JSON.stringify(j))
    })
}

function showError(error) {
  errorPara = document.createElement("p")
  errorMessage = document.createTextNode(`Status: ${error}`)
  document.getElementById("nasa-images").appendChild(errorPara)
  errorPara.appendChild(errorMessage)

}

function showImages(results) {
  clearResults()
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

function clearResults() {
  imageDivs = document.getElementById("nasa-images").getElementsByTagName("div")
  Array.from(imageDivs).map(div => {
    div.parentNode.removeChild(div)
  })
}

function showCaption(event) {
  event.target.parentNode.getElementsByTagName('p')[0].style.display = "block"
}

function hideCaption(event) {
  event.target.parentNode.getElementsByTagName('p')[0].style.display = "none"
}
