
const form = document.getElementById('form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let fullName = document.getElementById('fullName');
    let phoneNo = document.getElementById('phoneNo');
    let email = document.getElementById('email');

    if (fullName.value == '' || phoneNo.value == '' || email.value == '')
        return swal({
            title: "Required Fields",
            text: "All fields are required!",
            icon: "error",
            timer: 2000
        });

    fetch('http://nileshvishwa.com:3000/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            swal(data);
        })
        .catch(error => {
            console.error('Error:', error);
            swal(error, "error");
        });


})