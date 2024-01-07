// function checkName(name)
// {
//     const alphabetOnlyRegex = /^[A-Za-z]+$/;
//     return alphabetOnlyRegex.test(name);
// }

// Get a reference to the button element by its id
var downloadButton = document.getElementById("downloadbtn");
var inputName = document.getElementById("name");


function downloadFile(file){
      const base64FileData = file.data;

      // Convert the base64 string to a Uint8Array
      const byteCharacters = atob(base64FileData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Create a Blob from the Uint8Array
      const blob = new Blob([byteArray], { type: 'application/pdf' }); // Change the type if the file is not a PDF

      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = file.fileName; // Set the file name here
      downloadLink.click();
}


downloadButton.addEventListener("click", function() {
    
    var name = inputName.value.trim();

    if(!name)
      return alert("Invalid Name");

    try{
      fetch("http://localhost:3000/generate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name}),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        downloadFile(data.file);
      })

    }catch(error){
        console.log(error);
    }
});