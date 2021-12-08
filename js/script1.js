var searchForm = document.getElementById("search-form")
var inputText = document.getElementById("search")
var inputFormat= document.getElementById("search-format")
var textWords;
var format;

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
}

searchForm.addEventListener('submit', formSubmitHandler);

