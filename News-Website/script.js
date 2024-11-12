// Define constants for API key and URL
const API_KEY = "e8ad4a3f017c4e1686647e4f9a6fa09b";  // Replace with your actual API key
const URL = "https://newsapi.org/v2/everything?q=";  // The base URL for the API

// Listen for the window to load, then fetch the news for a default category
window.addEventListener("load", () => fetchNews("Technology"));

// Function to fetch news based on the provided query
async function fetchNews(query) {
    const newsCardsContainer = document.getElementById("newsCards");
    const loadingMessage = document.getElementById("loadingMessage");
    
    // Show loading message while data is being fetched
    loadingMessage.style.display = 'block';
    newsCardsContainer.innerHTML = '';  // Clear previous news cards
    
    try {
        // Fetch the news data from the API
        const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        
        // Hide loading message after fetching data
        loadingMessage.style.display = 'none';

        // Check if the API response is successful
        if (data.status === "ok" && data.articles.length > 0) {
            // Loop through each article and create a card
            data.articles.forEach(article => {
                // Exclude articles that are missing required properties
                if (!article.title || !article.urlToImage || !article.description || !article.url) {
                    return;  // Skip this article
                }

                // Create a new card element for each article
                const card = document.createElement("div");
                card.classList.add("col");

                // Add the article content to the card
                card.innerHTML = `
                    <div class="card">
                        <img src="${article.urlToImage || 'https://via.placeholder.com/370x200'}" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description || "No description available."}</p>
                            <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                        </div>
                    </div>
                `;
                // Append the card to the container
                newsCardsContainer.appendChild(card);
            });
        } else {
            // If no articles are found, show a message
            newsCardsContainer.innerHTML = '<p>No articles found for this query.</p>';
        }
    } catch (error) {
        // Handle errors (e.g., network issues)
        loadingMessage.style.display = 'none';
        newsCardsContainer.innerHTML = '<p>There was an error fetching the news. Please try again later.</p>';
        console.error("Error fetching news:", error);
    }
}

// Add event listeners to each navbar link
document.getElementById("General").addEventListener("click", () => fetchNews("General"));
document.getElementById("Business").addEventListener("click", () => fetchNews("Business"));
document.getElementById("Sports").addEventListener("click", () => fetchNews("Sports"));
document.getElementById("Entertainment").addEventListener("click", () => fetchNews("Entertainment"));
document.getElementById("Technology").addEventListener("click", () => fetchNews("Technology"));

// Event listener for search functionality
document.getElementById('searchBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const query = document.getElementById('newsQuery').value.trim();
    if (query) {
        fetchNews(query);  // Fetch news based on search query
    }
});
