const API_KEY = "9d1da1f0d5879fcf79f3ce34d5b552a8";

const newsContainer = document.getElementById("newsContainer");

const loading = document.getElementById("loading");

const errorMessage = document.getElementById("errorMessage");

const categoryTitle = document.getElementById("categoryTitle");

const lastUpdated = document.getElementById("lastUpdated");

const refreshBtn = document.getElementById("refreshBtn");


let currentCategory = "general";


const categoryNames = {
  general: "Latest News",
  business: "Business News",
  technology: "Technology News",
  sports: "Sports News",
  entertainment: "Entertainment News",
  health: "Health News"
};


async function getNews(category = "general") {

  currentCategory = category;

  newsContainer.innerHTML = "";

  loading.classList.remove("d-none");

  errorMessage.classList.add("d-none");


  try {

    const response = await fetch(
    `/api/news?category=${category}`
    );


    if (!response.ok) {
      throw new Error("Unable to fetch news.");
    }


    const data = await response.json();


    loading.classList.add("d-none");


    displayNews(data.articles);


    updateTime();


  } catch (error) {

    loading.classList.add("d-none");

    errorMessage.classList.remove("d-none");

    errorMessage.textContent =
      "Failed to load news. Please check your API key or internet connection.";

    console.error(error);

  }

}


function displayNews(articles) {

  if (!articles || articles.length === 0) {

    newsContainer.innerHTML = `
      <div class="col-12 text-center">
        <h4>No news available.</h4>
      </div>
    `;

    return;
  }


  articles.forEach((article) => {

    const image = article.image
      ? article.image
      : "https://via.placeholder.com/500x300?text=News";


    const publishedDate = new Date(
      article.publishedAt
    ).toLocaleString();


    const newsCard = document.createElement("div");

    newsCard.className = "col-lg-4 col-md-6";


    newsCard.innerHTML = `

      <div class="card news-card">

        <img
          src="${image}"
          class="news-image"
          alt="News Image"
        />

        <div class="news-content">

          <span class="badge bg-dark">
            ${currentCategory.toUpperCase()}
          </span>


          <h3 class="news-title mt-3">

            ${article.title || "No Title Available"}

          </h3>


          <p class="news-description">

            ${
              article.description ||
              "Click to read the complete news article."
            }

          </p>


          <div class="news-footer">

            <span>

              <i class="bi bi-newspaper"></i>

              ${article.source.name}

            </span>


            <span>

              ${publishedDate}

            </span>

          </div>

        </div>

      </div>

    `;


    newsCard.addEventListener("click", () => {

      window.open(
        article.url,
        "_blank"
      );

    });


    newsContainer.appendChild(newsCard);

  });

}


function updateTime() {

  const now = new Date();


  lastUpdated.innerHTML = `

    <strong>Last Updated:</strong>
    ${now.toLocaleDateString()}
    ${now.toLocaleTimeString()}

  `;

}


document.querySelectorAll(".category-btn")
  .forEach((button) => {

    button.addEventListener("click", (event) => {

      event.preventDefault();


      document
        .querySelectorAll(".category-btn")
        .forEach((item) => {

          item.classList.remove("active");

        });


      button.classList.add("active");


      const category =
        button.dataset.category;


      categoryTitle.textContent =
        categoryNames[category];


      getNews(category);

    });

  });


refreshBtn.addEventListener("click", () => {

  getNews(currentCategory);

});


getNews();