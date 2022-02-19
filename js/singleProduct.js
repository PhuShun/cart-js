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
var params = new URLSearchParams(location.search);
var id = params.get('id');
url = `http://localhost:3000/products/${id}`;

function convertMoney(num) {
    return num.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
    });
}

function getSingleProduct(callback) {
    fetch(url)
        .then((resolve) => {
            return resolve.json()
        })
        .then((products) => {
            if (products) {
                document.querySelector('.product-detail-area').innerHTML +=
                    `   <div class="container">
     <div class="row">
         <div class="col-md-5">
             <div class="single-product-view">
                 <!-- Nav tabs -->

                 <div class="view-large-photo">
                     <!-- Tab panes -->
                     <div class="simpleLens-container tab-content">
                         <div role="tabpanel" class="tab-pane active" id="img-1">
                             <div class="simpleLens-big-image-container">
                                 <a class="simpleLens-lens-image"
                                     data-lens-image="img/product/single-product/large/1.jpg" href="#">
                                     <img src="${products.image}" alt=""
                                         class="simpleLens-big-image" />
                                 </a>
                             </div>
                         </div>
                         <div role="tabpanel" class="tab-pane" id="img-2">
                             <div class="simpleLens-big-image-container">
                                 <a class="simpleLens-lens-image"
                                     data-lens-image="img/product/single-product/large/2.jpg" href="#">
                                     <img src="img/product/single-product/medium/2.jpg" alt=""
                                         class="simpleLens-big-image" />
                                 </a>
                             </div>
                         </div>
                         <div role="tabpanel" class="tab-pane" id="img-3">
                             <div class="simpleLens-big-image-container">
                                 <a class="simpleLens-lens-image"
                                     data-lens-image="img/product/single-product/large/3.jpg" href="#">
                                     <img src="img/product/single-product/medium/3.jpg" alt=""
                                         class="simpleLens-big-image" />
                                 </a>
                             </div>
                         </div>
                         <div role="tabpanel" class="tab-pane" id="img-4">
                             <div class="simpleLens-big-image-container">
                                 <a class="simpleLens-lens-image"
                                     data-lens-image="img/product/single-product/large/4.jpg" href="#">
                                     <img src="img/product/single-product/medium/4.jpg" alt=""
                                         class="simpleLens-big-image" />
                                 </a>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
         <div class="col-md-7">
             <div class="single-product-details listview">
                 <div class="product-content">
                     <h2 class="product-name">
                         <a href="#">${products.name}</a>
                     </h2>
                     <div class="rating-review">
                         <div class="pro-rating">
                             <a href="#"><i class="fa fa-star"></i></a>
                             <a href="#"><i class="fa fa-star"></i></a>
                             <a href="#"><i class="fa fa-star"></i></a>
                             <a href="#"><i class="fa fa-star-half-o"></i></a>
                             <a href="#"><i class="fa fa-star-o"></i></a>
                         </div>
                         <a class="reviews" href="#">6 Reviews</a>
                         <a class="add-review" href="#">Add Your Review</a>
                     </div>
                     <div class="stock">
                         <a href="#">In Stock</a>
                     </div>
                     <div class="price-box">
                         <span class="old-price">21.000 VND</span>
                         <span class="new-price">${convertMoney(products.price)}</span>
                     </div>
                     <div class="description">
                         <p>${products.detail}</p>
                     </div>
                     <div class="qty">
                         <span class="choose-title">Qty : </span>
                         <input type="number" placeholder="1" />
                     </div>
                     <div class="pro-actions">
                         <a class="action-btn action-btn-1" href="cart.html" onclick="addCart(${products.id}, '${products.name}', ${products.price}, '${products.image}')"><i class="pe-7s-cart"></i>Thêm sản phẩm</a>
                         <a class="action-btn" href="wishlist.html" data-toggle="tooltip"
                             data-original-title="Add to Wishlist"><i class="pe-7s-like"></i></a>
                         <a class="action-btn" href="#" data-toggle="tooltip"
                             data-original-title="Compare"><i class="pe-7s-repeat"></i></a>
                     </div>
                 </div>

             </div>
         </div>
     </div>
 </div`
            }
        })

}
getSingleProduct()

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