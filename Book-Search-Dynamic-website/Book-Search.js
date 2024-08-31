let searchInputEl = document.getElementById("searchInput");
    let searchResultsEl = document.getElementById("searchResults");
    let spinnerEl = document.getElementById("spinner");

    let responsiveContainerEl = document.createElement('div');
    responsiveContainerEl.classList.add("container");

    let responsiveRowEl = document.createElement('div');
    responsiveRowEl.classList.add("row");

    

    function createAndAppendResults(result){
        let resultImgSrc = result.imageLink;
        let bookAuthor = result.author;

        //creating responsive containers    
        searchResultsEl.appendChild(responsiveContainerEl);
        responsiveContainerEl.appendChild(responsiveRowEl);
        
        let responsiveColEl = document.createElement('div');
        responsiveColEl.classList.add("col-6", "col-md-4", "col-lg-3");
        responsiveRowEl.appendChild(responsiveColEl);


        //adding image element
        let imageEl = document.createElement('img');
        imageEl.classList.add("search-results-book-image");
        imageEl.setAttribute("src", resultImgSrc);
        responsiveColEl.appendChild(imageEl);

        //adding image description
        let descriptionEl = document.createElement('p');
        descriptionEl.classList.add("search-results-book-title");
        descriptionEl.textContent = bookAuthor;
        responsiveColEl.appendChild(descriptionEl);
    }

    function displayResults(searchResults){
        spinnerEl.classList.toggle("d-none");
        if(searchResults.length == 0){
            searchResultsEl.textContent = "No results found";
            searchResultsEl.classList.add("search-results-title");
        }
        else{
            searchResultsEl.textContent = "Popular Books";
            searchResultsEl.classList.add("search-results-title");
        }

        for(let result of searchResults){
            createAndAppendResults(result);
        }
    }

    function searchBooks(event){
        if(event.key === "Enter"){
            responsiveRowEl.innerHTML = "";
            searchResultsEl.textContent = "";
            spinnerEl.classList.toggle("d-none");

            let options = {
                method: "GET"
            }

            let searchInputValue = searchInputEl.value;
            let url = "https://apis.ccbp.in/book-store?title=" + searchInputValue;

            fetch(url, options)
            .then(function(response){
                return response.json();
            })
            .then(function(jsonData){
                console.log(jsonData);
                let {search_results} = jsonData;
                displayResults(search_results);
            });
        }
    }

    searchInputEl.addEventListener('keydown', searchBooks);