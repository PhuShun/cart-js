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

function xoaSP(id) {
    var hoi = confirm("Xác nhận xóa")
    if (hoi === false) {
        return;
    }
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    fetch(booksApi + '/' + id, options)
        .then((resolve) => {
            return resolve.json()
        })
        .then(() => {

        })
}

function renderProducts(products) {
    var listProducts = document.querySelector('.table-form')
    var html = products.map((product) => {
        return `
      
        <tr class="list-${product.id}">
            <td class="text-center"><input type="checkbox" id="check3-td1" name="check3-td1"></td>
            <td class="text-center">${product.id}</td>
            <td><a href="javascript:void(0)" class="aa">${product.name}</a></td>
            <td class="hidden-xs hidden-sm">
            <img src="${product.image}" align="left" class="img-product"><span class="text-product">${product.detail}</span></td>
            <td class="hidden-xs hidden-sm">${(product.price)}</td>
            <td class="hidden-xs hidden-sm">loại</td>
            <td class="text-center">
                <div class="btn-group">
                    <a href="javascript:void(0)" data-toggle="tooltip" title=""
                        class="btn btn-xs btn-info" data-original-title="Chi tiết"><i
                            class="fa fa-info-circle"></i></a> 
                    <a href="suaSanPham.html?id=${product.id}" data-toggle="tooltip" title=""
                        class="btn btn-xs btn-success" data-original-title="Sửa "><i
                            class="fa fa-pencil"></i></a>
                    <a href="#" onclick="xoaSP(${product.id})" data-toggle="tooltip" title=""
                        class="btn btn-xs btn-danger" data-original-title="Xóa"><i
                            class="fa fa-times"></i></a>
                </div>
            </td>
        </tr>
        `
    })
    // html.push(`<li><a href="cart.html">Giỏ hàng</a></li>`)
    listProducts.innerHTML = html.join('')
}