const arrayPages = [100, 8, 10, 15, 25, 31, 3, 9];

const firstPage = arrayPages[0];

const goods = async (page) => {
	const request = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);

	const data = await request.json();

	return data.data;
};

const createPage = (element, blog) => {
	const article = document.createElement('article');

	const articleLink = document.createElement('a');
	articleLink.classList.add('blog-article__link');
	articleLink.setAttribute('href', `${window.location.origin}/blog_article.html?id=${element.id}`);
	articleLink.setAttribute('target', '_blank');

	const card = document.createElement('div');
	card.classList.add('blog-card');

	card.innerHTML = `<div class="blog-card__image"></div>
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
		</div>`;

	articleLink.appendChild(card);
	article.appendChild(articleLink);

	blog.appendChild(article);
};

const renderGoods = async (page, blog) => {
	const data = await goods(page);

	data.forEach(element => {
		createPage(element, blog);
	});
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

	renderGoods(page, blog);

	pagination();

	const startPagination = document.querySelector('.pagination__pages-numb');
	startPagination.classList.add('active_page-block', 'active_page-content');
};

start(firstPage);

const newPageUrl = (activePageNumber) => {
	if (activePageNumber !== '1') {
		const url =
			`${window.location.origin}${window.location.pathname}?page=${activePageNumber}`;

		window.history.pushState({}, '', url);
	} else {
		const url =
			`${window.location.origin}${window.location.pathname}`;

		window.history.pushState({}, '', url);
	}
};

const pages = document.querySelector('.pagination__pages-numbers');

pages.addEventListener('click', (e) => {
	e.preventDefault();

	const clickNumber = e.target.innerHTML;

	const blog = document.querySelector('.blog');
	blog.innerHTML = '';

	const oldPageNumber = document.querySelector('.active_page-block');
	oldPageNumber.classList.remove('active_page-block', 'active_page-content');

	const ev = e.target;
	ev.classList.add('active_page-block', 'active_page-content');

	const indexClickNumber = clickNumber - 1;

	const arrayListIndex = arrayPages[indexClickNumber];

	renderGoods(arrayListIndex, blog);

	newPageUrl(clickNumber);
});

/* const blog = document.querySelector('.blog');
console.log(' blog', blog);

const linkArticleClick = () => {
	blog.addEventListener('click', (e) => {
		e.preventDefault();

		const card = e.target.closest('.blog-article__link');

		window.open(
			`${window.location.origin}/blog_article.html`,
			'_blank'
		);

		const article = card.search.slice(card.search.lastIndexOf('=') + 1);
	});
}; */
