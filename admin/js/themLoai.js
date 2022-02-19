var addProductApi = 'http://localhost:3000/categories';
// Functions


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
            document.location = "dsLoai.html"
        })
}

function handleCreatForm() {
    var btnCreate = document.querySelector('.btnLuu')
    btnCreate.onclick = () => {
        var formData = {
            name: document.querySelector('.ten').value.trim(),
        }
        handleCreatProduct(formData)
    }
}
handleCreatForm()