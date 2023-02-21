import FotoApiService from './FotoApiService.js';
import LoadMoreBtn from './components/LoadMoreBtn.js';
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

const fotoApiService = new FotoApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '#loadMore',
  isHidden: true,
});
console.log(fotoApiService);
console.log(loadMoreBtn);

loadMoreBtn.button.addEventListener('click', fetchHits);
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  fotoApiService.searchQuery = value;
  fotoApiService.resetPage();

  clearFotosList();
  loadMoreBtn.show();
  fetchHits().finally(() => form.reset());
}

function fetchHits() {
  loadMoreBtn.disable();

  return fotoApiService
    .getFotos()
    .then(hits => {
      if (hits.length === 0)
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

      return hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
      // loadMoreBtn.hidden = false;
    })
    .then(markup => {
      appendFotosToList(markup);
      loadMoreBtn.enable();
    })
    .catch(onError);
}

function appendFotosToList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearFotosList() {
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

// ----------------------------------------------------

// let page = 1;
// function loadMore() {
//   page += 1;
//   fetchData(value).then(({ hits }) =>
//     createMarkup({
//       webformatURL,
//       largeImageURL,
//       tags,
//       likes,
//       views,
//       comments,
//       downloads,
//     })
//   );
// }

// function onSubmit(e) {
//   e.preventDefault();

//   fetchData(value)
//     .then(({ hits }) => {
//       if (hits.length === 0)
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );

//       return hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
//       loadMoreBtn.hidden = false;
//     })
//     .then(updateNewsList)
//     .catch(onError)
//     .finally(() => form.reset());
// }

// function updateNewsList(markup) {
//   gallery.insertAdjacentHTML('beforeend', markup);
// }

// function createMarkup({
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// }) {
//   return `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads${downloads}</b>
//     </p>
//   </div>
// </div>`;
// }

// function onError(err) {
//   console.error(err);
// }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// function onSubmit(e) {
//   e.preventDefault();

//   const form = e.currentTarget;
//   const value = form.elements.searchQuery.value.trim();
//   searchFoto(value).then(({ hits }) => {
//     if (hits.length === 0)
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//   }).then(data => {
//     renderMarcup(data.hits);
//     loadMoreBtn.hidden = false;
//   })
//   .catch(error => console.log(error));
// }

// let page = 1;
// function loadMore() {
//   page += 1;
//   searchFoto(page).then(data => {
//     renderMarcup(data.hits);
//   });
// }

// function renderMarcup(arr) {
//   let marcup = arr
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<div class="photo-card">
//       <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//       <div class="info">
//         <p class="info-item">
//           <b>Likes${likes}</b>
//         </p>
//         <p class="info-item">
//           <b>Views${views}</b>
//         </p>
//         <p class="info-item">
//           <b>Comments${comments}</b>
//         </p>
//         <p class="info-item">
//           <b>Downloads${downloads}</b>
//         </p>
//       </div>
//     </div>`;
//       }
//     )
//     .join('');
//   gallery.insertAdjacentHTML('beforeend', marcup);
// }
