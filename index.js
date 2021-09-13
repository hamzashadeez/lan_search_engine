const input = document.getElementById("input");
const title = document.getElementById("title");
const content = document.getElementById("content");

async function searchWikipedia(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${searchQuery}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  return json;
}

function displayResults(results) {
  // Get a reference to the `.js-search-results` element
  const searchResults = document.querySelector("#container");
  searchResults.innerHTML = '';
  // Iterate over the `search` array. Each nested object in the array can be
  // accessed through the `result` parameter
  results.query.search.forEach((result) => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

    // Append the search result to the DOM
    searchResults.insertAdjacentHTML(
      "beforeend",
      `<div class="result-item" style="margin-bottom: 30px">
          <h3 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <a href="${url}" class="result-link" target="_blank" rel="noopener">View More Here:</a>
          <span class="result-snippet">${result.snippet}...</span><br>
        </div>`
    );
  });
}

const searchContent = async (input) => {
  const searchQuery = input.trim();
  try {
    const results = await searchWikipedia(searchQuery);
    displayResults(results);
} catch (err) {
    console.log(err);
    alert("Failed to search wikipedia");
}
//   alert(input);
};

document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    searchContent(input.value);
    input.value = '';
});
