var booksApi = 'http://localhost:3000/categories';
// http://localhost:3000/products
// http://localhost:3000/order
// http://localhost:3000/order_details

	function getBooks(callback) {
		fetch(booksApi)
			.then((resolve) => {
				return resolve.json()
			})
			.then((books) => {
				var listBooks = document.querySelector('.list-item')
				var html = books.map((book) =>{
					return `
						<li><a href="index.html">${book.name}</a></li>
					`
				})
				// html.push(`<li><a href="cart.html">Giỏ hàng</a></li>`)
				listBooks.innerHTML += html.join('')
			})
	}
getBooks()	