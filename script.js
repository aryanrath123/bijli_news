const apikey = "0fbc98ff914148ec955e0979bfed183f";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// Add async to the callback function
searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsByQuery(query); // Use await correctly here
      displayBlogs(articles);
    } catch (error) {
      console.log("Error fetching news by query:", error);
    }
  }
});

// Mark fetchNewsByQuery as async
async function fetchNewsByQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news by query:", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCardContainer = document.createElement("div");
    blogCardContainer.classList.add("blog-card-container");

    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const blogCardInner = document.createElement("div");
    blogCardInner.classList.add("blog-card-inner");

    // Front side of the card
    const front = document.createElement("div");
    front.classList.add("blog-card-front");

    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    const truncatedDes =
      article.description && article.description.length > 120
        ? article.description.slice(0, 130) + "...."
        : article.description;

    description.textContent = truncatedDes;

    front.appendChild(img);
    front.appendChild(title);
    front.appendChild(description);

    // Back side of the card
    const back = document.createElement("div");
    back.classList.add("blog-card-back");

    const showMoreButton = document.createElement("button");
    showMoreButton.textContent = "Show More";
    showMoreButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click event from bubbling up
      window.open(article.url, "_blank");
    });

    back.appendChild(showMoreButton);

    blogCardInner.appendChild(front);
    blogCardInner.appendChild(back);
    blogCard.appendChild(blogCardInner);
    blogCardContainer.appendChild(blogCard);

    blogContainer.appendChild(blogCardContainer);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news:", error);
  }
})();
