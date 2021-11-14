
const jsonFile = 'json/reviews.json', 
      reviewList = document.querySelector('.reviews__list'),
      loadMoreBtn = document.querySelector('.load-more');

let count = 0, countStart = 0;

async function getReviews() {
    
    countStart = count;

    loadMoreBtn.classList.add('_loading');

    let response = await fetch(jsonFile, {
        method: "GET"
    });
  
    if (response.ok) {
        let result = await response.json();

        for(let i = countStart; i < countStart+3; i++) {
            
            if(result['reviews'].length > i) {
                loadMore(result['reviews'][i]);
                count++;
            } else {
                loadMoreBtn.classList.add('_disabled');
                return false;
            }
            
            
        }

    } else {
        alert('error');
    }
}

function loadMore(element) {

    

    let typeAppend = (window.innerWidth > 992) ? 'afterbegin' : 'beforeend';

    let reviewItem = '',
        reviewRating = '',
        reviewRatingValue = Number(element['rating']),
        reviewDate = element['date'],
        reviewTitle = element['title'],
        reviewText = element['text'];

    for(let i = 0; i<reviewRatingValue; i++) {
        reviewRating = reviewRating + `<li class="reviews__item--rating-item _icon-star">★</li>`
    }

    reviewItem = `
        <li class="reviews__item wow animate__fadeInUp">
            <div class="reviews__item--header _pb20">
                <span class="reviews__item--date">
                    ${reviewDate}
                </span>
                <ul class="reviews__item--rating-list">
                    ${reviewRating}
                </ul>
            </div>
            <h3 class="reviews__item--title _list-title _pb20">
                ${reviewTitle}
            </h3>
            <div class="reviews__item--text">
                <p>
                    ${reviewText}
                </p>
            </div>
        </li>
    `;
    
    reviewList.insertAdjacentHTML(typeAppend, reviewItem);
    loadMoreBtn.classList.remove('_loading');
}


loadMoreBtn.addEventListener('click', function() {
    if(!this.classList.contains('_disabled')) {
        getReviews();
    }
});
