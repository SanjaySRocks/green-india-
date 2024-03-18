
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

    let btn = document.getElementById("submitbtn");
    const originalText = btn.innerText;

    btn.innerText = "Processing...";

    fetch('https://cg.nileshvishwa.com/generate', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: fullName.value,
                phoneNo: phoneNo.value,
                email: email.value
            })

        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            
            console.log(data);
            swal({
                title: 'Certificate Generated !',
                text: `Id: ${data.CertificateDetails._id } (${fullName.value}) !`, 
                icon: "success"
            });

            var downloadTab = window.open(`https://cg.nileshvishwa.com/download/${data.CertificateDetails._id}.pdf`, '_blank');
            setTimeout(function() {
                downloadTab.close();
              }, 5000);

            btn.innerText = originalText;
        })
        .catch(error => {
            console.error('Error:', error);
            swal(error, "error");

            btn.innerText = originalText;

        });

        
})