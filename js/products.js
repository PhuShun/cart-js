var booksApi = 'http://localhost:3000/products';

function start() {
    getProducts(renderProducts)
}
start();



function getProducts(callback) {
    fetch(booksApi)
        .then((resolve) => {
            return resolve.json()
        })
        .then(callback)
}

function addCart(id, name, price, image) {
    // JSON trả về kiểu dữ liệu JS và lấy dữ liệu
    var cart = JSON.parse(localStorage.getItem('cart'))
    if (cart == null) {
        cart = [];
        cart.push({
            id,
            name,
            price,
            image,
            quantity: 1
        })
    } else {
        var result = cart.find((item) => item.id === id)
        if (result) {
            result.quantity++
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            })
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}

function convertMoney(num) {
    return num.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
    });
}

function renderProducts(products) {
    var listProducts = document.querySelector('.owl-wrapper ')
    var html = products.map((product) => {

        return `
        <div class="owl-item" style="width: 293px;">
        <div class="col-md-12 ">
            <div class="single-product">
                <div class="product-img">
                    <div class="label-new">
                        <span class="new">New</span>
                    </div>
                    <div class="label-parcent">
                        <span class="parcent">-35%</span>
                    </div>
                    <a class="pro-image" href="#">
                        <img class="primary-image" src="${product.image}">                       
                    </a>
                    <div class="pro-actions">
                        <a class="action-btn action-btn-1" href="cart.html" onclick="addCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')"><i
                                class="pe-7s-cart"></i><span>Thêm sản phẩm</span></a>
                        <a class="action-btn" href="wishlist.html" data-toggle="tooltip"
                            data-original-title="Add to Wishlist"><i
                                class="pe-7s-like"></i></a>
                        <a class="action-btn" href="single-product.html?id=${product.id}" data-toggle="tooltip"
                            data-original-title="Compare"><i class="pe-7s-repeat"></i></a>
                    </div>
                </div>
                <div class="product-content">
                    <h2 class="product-name">
                        <a href="#">${product.name}</a>
                    </h2>
                    <div class="pro-rating">
                        <a href="#"><i class="fa fa-star"></i></a>
                        <a href="#"><i class="fa fa-star"></i></a>
                        <a href="#"><i class="fa fa-star"></i></a>
                        <a href="#"><i class="fa fa-star-half-o"></i></a>
                        <a href="#"><i class="fa fa-star-o"></i></a>
                    </div>
                    <div class="price-box">
                        <span class="new-price">${convertMoney(product.price)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `

    })
    // html.push(`<li><a href="cart.html">Giỏ hàng</a></li>`)
    listProducts.innerHTML += html.join('')
}