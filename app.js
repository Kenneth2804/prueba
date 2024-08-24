document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    const loginPage = document.getElementById('loginPage');
    const loadingPage = document.getElementById('loadingPage');
    const homePage = document.getElementById('homePage');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    const starRating = document.getElementById('starRating');
    const starCount = document.getElementById('starCount');

    function showPage(page) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.style.display = 'none');
        page.style.display = 'flex';
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        showPage(loadingPage);
        setTimeout(() => {
            showPage(homePage);
        }, 2000);
    });

    logoutButton.addEventListener('click', function () {
        showPage(loginPage);
    });

    commentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const commentText = document.getElementById('commentText').value;
        const selectedStars = starRating.querySelectorAll('.selected').length;
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.innerHTML = `<p>${commentText}</p>
            <div class="stars">
                <span data-star="1" class="star">&#9733;</span>
                <span data-star="2" class="star">&#9733;</span>
                <span data-star="3" class="star">&#9733;</span>
                <span data-star="4" class="star">&#9733;</span>
                <span data-star="5" class="star">&#9733;</span>
            </div>
            <p class="starCount">Rating: ${selectedStars} star${selectedStars > 1 ? 's' : ''}</p>`;
        commentsList.appendChild(comment);
        commentForm.reset();
        starRating.querySelectorAll('span').forEach(star => star.classList.remove('selected'));
        starCount.textContent = 'Rating: 0 stars';
    });

    starRating.addEventListener('click', function (e) {
        if (e.target.dataset.star) {
            const starValue = parseInt(e.target.dataset.star);
            starRating.querySelectorAll('span').forEach((star, index) => {
                if (index < starValue) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
            starCount.textContent = `Rating: ${starValue} star${starValue > 1 ? 's' : ''}`;
        }
    });

    commentsList.addEventListener('click', function (e) {
        if (e.target.classList.contains('star')) {
            const commentDiv = e.target.closest('.comment');
            const starValue = parseInt(e.target.dataset.star);
            const stars = commentDiv.querySelectorAll('.star');
            stars.forEach((star, index) => {
                if (index < starValue) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
            const starCount = commentDiv.querySelector('.starCount');
            starCount.textContent = `Rating: ${starValue} star${starValue > 1 ? 's' : ''}`;
        }
    });

    showPage(loginPage);
});
