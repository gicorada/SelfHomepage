// Constants
let HOST



// Funzione per caricare i dati da un file JSON
function loadData(file, callback) {
    fetch(file)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Errore nel caricamento dei dati:', error));
}

// Modifica la funzione di inizializzazione per usare i dati caricati
document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');

	// Loads settings
	loadData("conf/settings.json", function(data) {
		if(data.host) HOST = data.host;
	});

    // Loads services
    loadData("conf/services.json", function(data) {
        data.services.forEach((item, index) => {
            let service = createServiceElement(item, index + 1);
            content.appendChild(service);
        });
    });
});

function createServiceElement(item, id) {
    let element = document.createElement('div');
    element.className = 'item';

    // Utilizza i dati dal JSON per popolare l'elemento
    element.innerHTML = `
		<a href="http://${HOST}:${item.port}">
			<img src="${item.image}" alt="${item.title} logo">
	        <h2>${item.title}</h2>
        	<p>Port ${item.port}</p>
		</a>
    `;

    return element;
}
