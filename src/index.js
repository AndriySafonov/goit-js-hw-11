import PhotoApiService from './PhotoApiService.js';
import LoadMoreBtn from './components/LoadMoreBtn.js';
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

const photoApiService = new PhotoApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '#loadMore',
  isHidden: true,
});
console.log(photoApiService);
console.log(loadMoreBtn);

loadMoreBtn.button.addEventListener('click', fetchHits);
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  photoApiService.searchQuery = value;
  photoApiService.resetPage();

  clearPhotosList();
  loadMoreBtn.show();
  fetchHits().finally(() => form.reset());
}

function fetchHits() {
  loadMoreBtn.disable();

  return photoApiService
    .getPhotos()
    .then(hits => {
      if (hits.length === 0)
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

      return hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
      // loadMoreBtn.hidden = false;
    })
    .then(markup => {
      appendPhotosToList(markup);
      loadMoreBtn.enable();
    })
    .catch(onError);
}

function appendPhotosToList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearPhotosList() {
  gallery.innerHTML = '';
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
  loadMoreBtn.hide();
}

