// function checkName(name)
// {
//     const alphabetOnlyRegex = /^[A-Za-z]+$/;
//     return alphabetOnlyRegex.test(name);
// }

// Get a reference to the button element by its id
var downloadButton = document.getElementById("downloadbtn");
var inputName = document.getElementById("name");

downloadButton.addEventListener("click", function() {
    
    var name = inputName.value.trim();

    if(!name)
      return alert("Invalid Name");

    const baseURL = "http://64.225.85.95:3000"
    const genURL = baseURL+'/generate/'+inputName.value;
    
    fetch(genURL).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    var downloadWindow = window.open(baseURL+data.certificateFile);
    setTimeout(() => {
        downloadWindow.close();
    }, 1000);  
    })
  .catch(error => {    console.error('Fetch error:', error);
  });
});