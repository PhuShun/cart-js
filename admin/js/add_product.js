var addProductApi = 'http://localhost:3000/products';
// Functions
function convertMoney(num) {
    return num.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
    });
}
function handleCreatProduct(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(addProductApi, options)
        .then((resolve) => {
            return resolve.json()
        })
        .then(() => {
            document.location = "dsSanPham.html"
        })
}

function handleCreatForm() {
    var btnCreate = document.querySelector('.btnLuu')
    btnCreate.onclick = () => {
        var formData = {
            name: document.querySelector('.ten').value.trim(),
            price: document.querySelector('.gia').value.trim(),
            image: document.querySelector('.hinh').value.trim(),
            detail: document.querySelector('.detail').value.trim(),
            cate_id: document.querySelector('#cate_id').value.trim()
        }
        handleCreatProduct(formData)
    }
}
handleCreatForm()


var booksApi = 'http://localhost:3000/categories';

function getBooks() {
    fetch(booksApi)
        .then((resolve) => {
            return resolve.json()
        })
        .then((books) => {
            var listBooks = document.querySelector('#cate_id')
            var html = books.map((book) => {
                return `
					<option value="${book.id}">${book.name}</option>
					`
            })
            listBooks.innerHTML += html.join('')
        })
}
getBooks()