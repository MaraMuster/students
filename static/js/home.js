function getapi() {
    fetch('http://mensaapp.f4.htw-berlin.de/api/menu').then(response => {
        return response.json();


    }).then(data => {

        console.log(data);

        var json = data;



        document.getElementById("menulist").innerHTML= JSON.stringify(data, undefined, 2);
    }).catch(err => {
        console.log(err)
    });
}

