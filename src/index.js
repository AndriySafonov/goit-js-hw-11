import fetchData from './api.js';
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', loadMore);

let page = 1;
function loadMore() {
  page += 1;
  fetchData(q).then(data =>
    createMarkup({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    })
  );
}

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  fetchData(value)
    .then(({ hits }) => {
      if (hits.length === 0)
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

      return hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
      loadMoreBtn.hidden = false;
    })
    .then(updateNewsList)
    .catch(onError)
    .finally(() => form.reset());
}

function updateNewsList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${likes}</b>
    </p>
    <p class="info-item">
      <b>Views${views}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`;
}

function onError(err) {
  console.error(err);
}
