var booksApi = 'http://localhost:3000/categories';

function getBooks(callback) {
    fetch(booksApi)
        .then((resolve) => {
            return resolve.json()
        })
        .then((books) => {
            var listBooks = document.querySelector('.list-item')
            var html = books.map((book) => {
                return `
						<li><a href="index.html">${book.name}</a></li>
					`
            })
            // html.push(`<li><a href="cart.html">Giỏ hàng</a></li>`)
            listBooks.innerHTML += html.join('')
        })
}
getBooks()

function convertMoney(num) {
    return num.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
    });
}
var cart = JSON.parse(localStorage.getItem('cart'));
if (cart) {
    cart.forEach((item, index) => {
        document.querySelector('.cart-table-head').innerHTML +=
            `<tbody>
        <tr>
            <td class="text-left shopping-cart-breif ">
                <a href="#"><img class="image-tr" src="${item.image}" alt="#" /></a>
                <h5><a href="#" class="text-uppercase">${item.name}</a></h5>
            </td>
            <td class="text-center">
                <div class="custom-cart">${convertMoney(item.price)}</div>
            </td>
            <td class="text-center">
                <div class="cart-plus-minus">
                    <input type="text" value="${item.quantity}" name="qtybutton" class="cart-plus-minus-box " onkeyup="totalPrice(${item.price}, this.value, ${index})">
                </div>
            </td>
            <td class="text-center sum-price">${convertMoney(item.price * item.quantity)}</td>
            <td class="text-center remove">
                <a href="#" onclick="xoaCart(${item.id})"><i class="pe-7s-close"></i></a>
            </td>
        </tr>
    </tbody>`
    })

}

function totalPrice(price, quantity, i) {
    var priceTotal = price * quantity;
    parseInt(document.querySelectorAll('.sum-price')[i].innerText = (priceTotal))
    sumPrice()
}

function sumPrice() {
    var sumPrice = document.getElementsByClassName('sum-price')
    sum = 0;
    for (let t of sumPrice) {
        sum += parseInt(t.innerText)
    }
    document.querySelector('.sum').innerText = convertMoney(sum);
}

function xoaCart(id) {
    var cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
        cart = cart.find((item) => item.id === id)
    }
    localStorage.removeItem(`cart.${id}`)
    document.location = "cart.html"

}