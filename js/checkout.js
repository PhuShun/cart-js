var booksApi = 'http://localhost:3000/categories';
var orderApi = "http://localhost:3000/order"
var detailsApi = "http://localhost:3000/order_details"

function start() {
    getBooks()


}
start()
var $ = document.querySelector.bind(document)

function getBooks() {
    fetch(booksApi)
        .then((resolve) => {
            return resolve.json()
        })
        .then((books) => {
            var html = books.map((book) => {
                return `
						<li><a href="index.html">${book.name}</a></li>
					`
            })
            // html.push(`<li><a href="cart.html">Giỏ hàng</a></li>`)
            $('.list-item').innerHTML += html.join('')
        })
}

$('.thanhtoan').onclick = () => {
    var ho = document.querySelector('.ho').value.trim()
    var ten = document.querySelector('.ten').value.trim()
    var address = document.querySelector('.address').value.trim()
    var phone = document.querySelector('.phone').value.trim()
    var email = document.querySelector('.email').value.trim()
    if (ho == "" && ten == "") {
        alert('Vui lòng nhập lại họ tên');
        return;
    }
    if (address == "") {
        alert('Vui lòng điền địa chỉ');
        return;
    }
    if (phone == "") {
        alert('Vui lòng nhập lại số điện thoại');
        return;
    }
    if ((email == "")) {
        alert('Email không hợp lệ');
        return;
    }
    var order = {
        "customer_name": ho + ' ' + ten,
        "customer_address": address,
        "customer_email": email,
        "customer_phone_number": phone,
        "created_date": new Date().toISOString().slice(0, 10),
        "startus": "Chờ xác nhận"
    }
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    }
    fetch(orderApi, options)
        .then((resolve) => {
            return resolve.json()
        })
        .then(data => {
            var order_id = data.id
            saveOrder(order_id)
        })

   
}
function saveOrder(order_id) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    cart.forEach((product) => {
        var productObj = {
            "order_id": order_id,
            "product_id": product.id,
            "quantity": product.quantity,
            "unit_price": product.price
        }
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productObj)
        }
        fetch(detailsApi, options)
            .then((resolve) => {
                return resolve.json()
            })
        then((data) => {

        })
    })
}
