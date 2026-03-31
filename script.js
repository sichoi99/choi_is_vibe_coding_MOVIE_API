const API_URL = "https://api.themoviedb.org/3/movie/now_playing";
const API_KEY = "df767d7f9f5b017659f97e1fcce32fc9";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const movieGrid = document.getElementById("movie-grid");

function createMovieCard(movie) {
  const posterMarkup = movie.poster_path
    ? `<img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title} 포스터">`
    : `<div class="empty-poster">포스터 이미지가 없습니다.</div>`;

  return `
    <article class="movie-card">
      <div class="poster-wrap">
        ${posterMarkup}
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
      </div>
    </article>
  `;
}

async function fetchNowPlayingMovies() {
  const requestUrl = `${API_URL}?api_key=${API_KEY}&language=ko-KR&page=1`;

  try {
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error("영화 데이터를 불러오지 못했습니다.");
    }

    const data = await response.json();
    const movies = data.results || [];

    if (!movies.length) {
      movieGrid.innerHTML = `<div class="status-card">현재 표시할 영화가 없습니다.</div>`;
      return;
    }

    movieGrid.innerHTML = movies.map(createMovieCard).join("");
  } catch (error) {
    movieGrid.innerHTML = `
      <div class="status-card">
        영화 정보를 가져오는 중 문제가 발생했습니다.<br>
        잠시 후 다시 시도해주세요.
      </div>
    `;
    console.error(error);
  }
}

fetchNowPlayingMovies();
