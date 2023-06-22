const articleNumber = window.location.href.slice(window.location.href.lastIndexOf('=') + 1);

const breadcrumbsLinks = document.querySelectorAll('.breadcrumbs__items-link');

breadcrumbsLinks[0].setAttribute('href', `${window.location.origin}/index.html`);
breadcrumbsLinks[1].setAttribute('href', `${window.location.origin}/blog.html`);

const getData = async (articleNumber) => {
	const request = await fetch(`https://gorest.co.in/public-api/posts/${articleNumber}`);

	const data = await request.json();

	return data.data;
};

const renderArticle = async (articleNumber) => {
	const data = await getData(articleNumber);

	console.log('data', data);

	const breadcrumbsArticleTitle = document.querySelector('.breadcrumbs__item_article');
	breadcrumbsArticleTitle.innerHTML = `${data.title}`;

	const title = document.querySelector('.article__title');
	title.innerHTML = `${data.title}`;

	const content = document.querySelector('.article__content');
	content.innerHTML = `${data.body}`;

	const authorNumber = data.user_id;

	const getDataAuthor = async (authorNumber) => {
		const request = await fetch(`https://gorest.co.in/public-api/users/${authorNumber}`);

		const dataAuthor = await request.json();

		return dataAuthor.data;
	};

	const renderAuthor = async (authorNumber) => {
		const dataAuthor = await getDataAuthor(authorNumber);

		console.log('dataAuthor', dataAuthor);

		const author = document.querySelector('.article__footer-author');
		author.innerHTML = `${dataAuthor.name}`;
	};

	renderAuthor(authorNumber);
};

renderArticle(articleNumber);

const backspace = document.querySelector('.article__footer-link');
backspace.setAttribute('href', `${window.location.origin}/blog.html`);


