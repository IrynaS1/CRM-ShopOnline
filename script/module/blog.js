const arrayPages = [100, 8, 10, 15, 25];
console.log('arrayPages', arrayPages);

const firstPage = arrayPages[0];

const goods = async (page) => {
	const request = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);

	const data = await request.json();

	return data.data;
};

const createPage = (element, blog) => {
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
};

const renderGoods = async (page, blog) => {
	console.log('page in renderGoods', page);

	const data = await goods(page);

	console.log('data', data);

	data.forEach(element => {
		createPage(element, blog);
	});

	return blog;
};

const createPaginationBlock = () => {
	const paginationBlock = document.querySelector('.pagination__pages-numbers');

	for (let i = 0; i <= arrayPages.length - 1; i++) {
		const paginationPageNumber = document.createElement('p');
		paginationPageNumber.classList.add('pagination__pages-numb');

		paginationPageNumber.innerText = `${i}`;

		paginationBlock.appendChild(paginationPageNumber);
	}

	return paginationBlock;
};

const pagination = () => {
	const paginationBlock = createPaginationBlock();

	const paginationNumbers = document.querySelectorAll('.pagination__pages-numb');

	const paginationLinks = document.querySelectorAll('.pagination__link');
	paginationNumbers[0].innerHTML = '1';

	for (let i = 1; i <= paginationNumbers.length - 1; i++) {
		paginationNumbers[i].innerHTML = `${i + 1}`;
	}
};

const start = (page) => {
	const blog = document.querySelector('.blog');
	console.log('blog in start', blog);

	renderGoods(page, blog);

	console.log('blog in start -------', blog);

	pagination();

	const startPagination = document.querySelector('.pagination__pages-numb');
	startPagination.classList.add('active_page-block', 'active_page-content');
};

start(firstPage);

const newPageUrl = (page) => {
	if (page === '1') {
		window.location.assign(
			`${window.location.origin}${window.location.pathname}`);
	} else {
		const params = new URLSearchParams();

		params.set('page', `${page}`);
		console.log(params.toString());

		window.location.assign(
			`${window.location.origin}${window.location.pathname}?${params.toString()}`);
	}
};

const pages = document.querySelector('.pagination__pages-numbers');

pages.addEventListener('click', (e) => {
	e.preventDefault;

	const blog = document.querySelector('.blog');
	blog.innerHTML = '';

	const oldPageNumber = document.querySelector('.active_page-block');
	oldPageNumber.classList.remove('active_page-block', 'active_page-content');

	const ev = e.target;
	ev.classList.add('active_page-block', 'active_page-content');

	console.log(' e.target.', e.target);

	const clickNumber = e.target.innerHTML;

	newPageUrl(clickNumber);

	const indexClickNumber = clickNumber - 1;

	const arrayListIndex = arrayPages[indexClickNumber];

	renderGoods(arrayListIndex, blog);
});

