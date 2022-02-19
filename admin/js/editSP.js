var params = new URLSearchParams(location.search);
var id = params.get('id');
url = `http://localhost:3000/categories/${id}`;

fetch(url)
    .then(resolve => {
        return resolve.json();
    })
    .then((data) => {
        console.log(data);
        document.querySelector('.ten').value = data.name;
    })
var btnCreate = document.querySelector('.btnLuu')
btnCreate.onclick = () => {
    var formData = {
        name: document.querySelector('.ten').value.trim(),
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
            document.location = "dsLoai.html"
        })

}