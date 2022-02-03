window.onload = init;

var serieList, serieDetail;

function init() {
    serieList = document.getElementById("seriesList");
    serieDetails = document.getElementById("serieDetails");
    ajax('../api/public/api/v1/serie', displayListServices)
}

function displayListServices() {
    if(this.status === 200) {
        let series = JSON.parse(this.responseText);
        series.forEach(serie => {
            let serieLink = document.createElement('a');
            serieLink.innerHTML = serie.name;
            serieLink.href = '../api/public/api/v1/serie/'+serie.id;
            serieLink.dataset.serieId = serie.id;
            serieLink.onclick = fireSerieDetail;
            serieList.appendChild(serieLink);
            serieList.appendChild(document.createElement('br'));
        })
    }
}

function fireSerieDetail(evt) {
    evt.preventDefault();
    let url =evt.target.href;
    displaySerie(url);
}

function displaySerie(url) {
    ajax(url, displaySerieDetail);
}

function displaySerieDetail() {
    let serie = JSON.parse(this.responseText);
    serieDetails.innerHTML=`<h1>${serie.name}</h1>`;
}

function ajax(url, callbackfunction, method='GET') {
    let req = new XMLHttpRequest();
    req.open(method, url, true);
    req.onload = callbackfunction;
    req.send();
}