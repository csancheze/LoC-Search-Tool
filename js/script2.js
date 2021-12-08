var searchForm = document.getElementById("search-form")
var inputText = document.getElementById("search")
var inputFormat= document.getElementById("search-format")
var resultsText = document.getElementById("results-texts")
var container=document.getElementById("container")
var searchParameters = document.location.search.split("&")
var textWords = searchParameters[0].split('=').pop();
var format = searchParameters[1].split('=').pop();
console.log(searchParameters)
console.log(textWords)
console.log(format)
inputText.value = textWords
inputFormat.value = format


var formSubmitHandler = function (event) {
    event.preventDefault();
    textWords = inputText.value.trim();
    format = inputFormat.value
    if (!textWords) {
      alert("Please, write something in the search box!")
      return
    }
  if (format == "") {
    format = "search"
  }
  document.location.assign("./search-results.html?q="+textWords+"&format="+format)
  getSearchResults();
}

function getSearchResults () {
    var apiUrl = "https://www.loc.gov/" + format + "/?q=" + textWords + "&fo=json"
    console.log(apiUrl)
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          return response.json()
        }})
      .then(function (data) {
        console.log(data);
        var results = data.results
        console.log(results)
        if (results.length == 0) {
            resultsText.textContent="No results"
            container.innerHTML=""
            alert("no results")
            return
        }
        resultsText.textContent = "Showing results for: "+textWords
        renderResults(results)

      })
    }    


function renderResults (results) {
    for (let i=0;i<results.length;i++) {
        var resultCard = document.createElement('div');
        resultCard.classList.add('card', 'bg-dark', 'text-muted', 'm-3', 'p-3');

        var resultBody = document.createElement('div');
        resultBody.classList.add('card-body');
        resultCard.append(resultBody);
       
        var titleEl = document.createElement('h3');
        titleEl.classList.add("text-light")
        titleEl.textContent = results[i].title;
       
        var bodyContentEl = document.createElement('p');
        bodyContentEl.innerHTML =
        '<strong>Date:</strong> ' + results[i].date + '<br/>';
       
         if (results[i].subject) {
           bodyContentEl.innerHTML +=
             '<strong>Subjects:</strong> ' + results[i].subject.join(', ') + '<br/>';
         } else {
           bodyContentEl.innerHTML +=
             '<strong>Subjects:</strong> No subject for this entry.';
         }
       
         if (results[i].description) {
           bodyContentEl.innerHTML +=
             '<strong>Description:</strong> ' + results[i].description[0];
         } else {
           bodyContentEl.innerHTML +=
             '<strong>Description:</strong>  No description for this entry.';
         }
       
         var linkButtonEl = document.createElement('a');
         linkButtonEl.textContent = 'Read More';
         linkButtonEl.setAttribute('href', results[i].url);
         linkButtonEl.classList.add('btn', 'btn-dark');
       
         resultBody.append(titleEl, bodyContentEl, linkButtonEl);
       
        container.append(resultCard);     

    }

}



searchForm.addEventListener('submit', formSubmitHandler);

getSearchResults()