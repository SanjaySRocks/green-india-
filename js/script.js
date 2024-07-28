
const form = document.getElementById('form');
const fullName = document.getElementById('fullName');
const phoneNo = document.getElementById('phoneNo');
const email = document.getElementById('email');
const imageInput = document.getElementById('imageInput');
const btn = document.getElementById("submitbtn");
const originalText = btn.innerText;

const plantApiUrl = "https://api.plant.id/v2/identify";
const plantAPIkey = "I6TPx3fdJqS1AlqJTUjtL3eLaJKWZMO3qT1lZ1ddNpeVL02THy";

const certApiUrl = "https://cg.api.projects.sanjay.amsgamers.xyz/generate";

function isFormInvalid() {
    return !fullName.value || !phoneNo.value || !email.value;
}

function isImageSelected() {
    return imageInput.files.length > 0;
}

function getBase64Image(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = () => reject('Failed to read file');
        reader.readAsDataURL(file);
    });
}

async function isPlant(base64Image) {

    btn.innerText = "Verifying Image...";

    const data = {
        api_key: plantAPIkey,
        images: base64Image,
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: ["common_names",
            "url",
            "name_authority",
            "wiki_description",
            "taxonomy",
            "synonyms"],
    };

    const response = await fetch(plantApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    btn.innerText = originalText;

    return result.is_plant;
}

function downloadCertificate(id) {
    const downloadTab = window.open(`https://cg.api.projects.sanjay.amsgamers.xyz/download/${id}.pdf`, '_blank');
    setTimeout(() => downloadTab.close(), 5000);
}

async function genCertficate(fullName, phoneNo, email) {

    btn.innerText = "Processing...";

    const response = await fetch(certApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName,
            phoneNo,
            email
        })
    })

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log(data);

    if(data)
    {
        swal({
            title: 'Certificate Generated !',
            text: `Id: ${data.CertificateDetails._id} (${fullName}) !`,
            icon: "success"
        });
    
        downloadCertificate(data.CertificateDetails._id);
    }
    
    btn.innerText = originalText;
}


form.addEventListener('submit', async function (e) {
    e.preventDefault();


    if (isFormInvalid()) {
        swal({
            title: "Required Fields",
            text: "All fields are required!",
            icon: "error",
            timer: 2000
        });
        return;
    }


    if (!isImageSelected()) {
        alert('Please select an image to upload.');
        return;
    }

    const base64Image = await getBase64Image(imageInput.files[0]);

    try {

        const checkPlant = await isPlant(base64Image);

        if (checkPlant == true) {
            await genCertficate(fullName.value, phoneNo.value, email.value);
        }else{
            alert("We were unable to detect your Plant failed to generate certificate!");
        }


    } catch (err) {
        alert(err);
    }



})
