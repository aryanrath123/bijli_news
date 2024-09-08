const apikey = "0fbc98ff914148ec955e0979bfed183f";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Random News Data:", data); // Debugging
    return data.articles || []; // Ensure articles is defined
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

async function fetchNewsByQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Query News Data:", data); // Debugging
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news by query:", error);
    return [];
  }
}

function displayBlogs(articles) {
  console.log("Articles received by displayBlogs:", articles); // Debugging
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    try {
      const blogCardContainer = document.createElement("div");
      blogCardContainer.classList.add("blog-card-container");

      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");

      const blogCardInner = document.createElement("div");
      blogCardInner.classList.add("blog-card-inner");

      const front = document.createElement("div");
      front.classList.add("blog-card-front");

      const img = document.createElement("img");
      img.src = article.urlToImage || "default-image-url.jpg"; // Use a default image if none provided
      img.alt = article.title || "No title";

      const title = document.createElement("h2");
      const truncatedTitle =
        (article.title || "").length > 30
          ? (article.title || "").slice(0, 30) + "...."
          : article.title || "No title";
      title.textContent = truncatedTitle;

      const description = document.createElement("p");
      const truncatedDes =
        (article.description || "").length > 120
          ? (article.description || "").slice(0, 130) + "...."
          : article.description || "No description";

      description.textContent = truncatedDes;

      front.appendChild(img);
      front.appendChild(title);
      front.appendChild(description);

      const back = document.createElement("div");
      back.classList.add("blog-card-back");

      const showMoreButton = document.createElement("button");
      showMoreButton.textContent = "Show More";
      showMoreButton.addEventListener("click", (e) => {
        e.stopPropagation();
        window.open(article.url, "_blank");
      });

      back.appendChild(showMoreButton);

      blogCardInner.appendChild(front);
      blogCardInner.appendChild(back);
      blogCard.appendChild(blogCardInner);
      blogCardContainer.appendChild(blogCard);

      blogContainer.appendChild(blogCardContainer);
    } catch (e) {
      console.error("Error creating blog card:", e);
    }
  });
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsByQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.error("Error fetching news by query:", error);
    }
  }
});

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news:", error);
  }
})();
