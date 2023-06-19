const arrayPages = [100, 8, 10, 15, 25];

const firstPage = arrayPages[0];

const goods = async (page) => {
	const request = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);

	const data = await request.json();

	return data.data;
};

const renderGoods = async (page) => {
	console.log('page in renderGoods', page);
	const blog = document.querySelector('.blog');

	const data = await goods(page);

	console.log('data', data);

	data.forEach(element => {
		const article = document.createElement('article');

		const articleLink = document.createElement('a');
		articleLink.setAttribute('href', `http://127.0.0.1:5500/blogs/article.html?id=${element.id}`);

		const card = document.createElement('div');
		card.classList.add('blog-card');

		card.innerHTML = `<div class="blog-card">
			<div class="blog-card__image"></div>
			<div class="blog-card__description">
				<div class="blog-card__title">
					<p class="blog-card__title-text">${element.title}</p>
				</div>
				<div class="blog-card__date">
					<p class="blog-card__date blog-card__date_text">22 октября 2021, 12:45</p>
				</div>
				<div class="blog-card__footer">
					<div class="blog-card__footer-views">
						<p class="blog-card__footer-views-img"></p>
						<p class="blog-card__footer-views-number">1.2K</p>
					</div>
					<div class="blog-card__footer-comments">
						<p class="blog-card__footer-comments-img"></p>
						<p class="blog-card__footer-comments-number">0</p>
					</div>
				</div>
			</div>
		</div>`;

		articleLink.appendChild(card);
		article.appendChild(articleLink);

		blog.appendChild(article);
	});
};
/* 
const createNewPage = (page) => {
	const actualUrl = window.location.href;

	const subString = '?page=';

	if (subsring) {
		const indexSubString = actualUrl.indexOf(subString);

		const url = actualUrl.substring(0, indexSubString);

		if (page === 1) {
			const createPage = url;

			return createPage;
		} else {
			const createPage = url + `?page=${page}`;

			return createPage;
		}
	} else {
		return actualUrl;
	}
}; */

const createPaginationBlock = () => {
	const url = window.location.href;
	const paginationBlock = document.querySelector('.pagination__pages-numbers');

	for (let i = 0; i <= arrayPages.length - 1; i++) {
		const paginationLink = document.createElement('a');
		paginationLink.setAttribute('href', `${url}`);
		paginationLink.classList.add('pagination__link');

		const paginationPageNumber = document.createElement('p');
		paginationPageNumber.classList.add('pagination__pages-numb');

		paginationPageNumber.innerText = `${i}`;

		paginationLink.appendChild(paginationPageNumber);

		paginationBlock.appendChild(paginationLink);
	}

	return paginationBlock;
};

const pagination = () => {
	const paginationBlock = createPaginationBlock();

	const paginationNumbers = document.querySelectorAll('.pagination__pages-numb');

	const paginationLinks = document.querySelectorAll('.pagination__link');

	for (let i = 0; i <= paginationNumbers.length - 1; i++) {
		paginationNumbers[i].innerHTML = `${i + 1}`;

		paginationLinks[i].href = `http://127.0.0.1:5500/blogs/blog.html?page=${i + 1}`;
	}
};

const start = (page) => {
	renderGoods(page);

	pagination();

	const startPagination = document.querySelector('.pagination__pages-numb');
	startPagination.classList.add('active_page-block');
};

start(firstPage);

const pages = document.querySelector('.pagination__pages-numbers');
console.log('pages', pages);

pages.addEventListener('click', (e) => {
	e.preventDefault;

	const clickNumber = e.target.innerHTML;

	const indexClickNumber = clickNumber - 1;
	console.log('indexClickNumber', indexClickNumber);

	const arrayListIndex = arrayPages[indexClickNumber];

	renderGoods(arrayListIndex);
});