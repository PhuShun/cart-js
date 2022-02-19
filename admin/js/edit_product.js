var params = new URLSearchParams(location.search);
var id = params.get('id');
url = `http://localhost:3000/products/${id}`;
function convertMoney(num) {
    return num.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
    });
}
fetch(url)
    .then(resolve => {
        return resolve.json();
    })
    .then((data) => {
        console.log(data);
        document.querySelector('.ten').value = data.name;
        document.querySelector('.gia').value = data.price;
        document.querySelector('.hinh').value = data.image;
        document.querySelector('.detail').value = data.detail;
        document.querySelector('#cate_id').value = data.cate_id;
    })
    var btnCreate = document.querySelector('.btnLuu')
    btnCreate.onclick = () => {
        var formData = {
            name: document.querySelector('.ten').value.trim(),
            price: document.querySelector('.gia').value.trim(),
            image: document.querySelector('.hinh').value.trim(),
            detail: document.querySelector('.detail').value.trim(),
            cat_id: document.querySelector('#cate_id').value.trim()
        }
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(formData)
        }
        fetch(url, options)
            .then((resolve) => {
                return resolve.json()
            })
            .then(() => {
                document.location = "dsSanPham.html"
            })

    }