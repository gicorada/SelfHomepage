let HOST


let servicesArray = [];


function validateSettings(data) {
    if (data.host == null) {
        throw new Error('You must declare an host in the settings file.');
    }
}

function validateServices(data) {
    data.services.forEach(service => {
        if (typeof service.title !== 'string' || typeof service.port !== 'number' || typeof service.image !== 'string') {
            throw new Error('Each service must have "title", "port", e "image" declared');
        }
    });
}

function loadData(file, callback) {
    fetch(file)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Data loading error', error));
}

document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');

	// Loads settings
	loadData("conf/settings.json", function(data) {
		try {
			validateSettings(data);
			if(data.host) HOST = data.host;
		} catch (error) {
			console.error("Error in settings validation: ", error);
		}
	});

    // Loads services
    loadData("conf/services.json", function(data) {
		try {
			data.services.forEach((item) => {
				let service = {
					title: item.title,
					port: item.port,
					image: item.image,
					url: `http://${HOST}:${item.port}`
				};
				servicesArray.push(service);
			});
	
			// Sort services by port
			servicesArray.sort((a, b) => a.port - b.port);
	
			servicesArray.forEach(service => {
				let serviceElement = createServiceElement(service);
				content.appendChild(serviceElement);
			});

			validateServices(data);
		} catch (error) {
			console.error("Error in services validation: ", error);
		}
    });
});

function createServiceElement(service) {
    let element = document.createElement('a');
	element.href = service.url;
    element.className = 'item';

    element.innerHTML = `
		<img src="${service.image}" alt="${service.title} logo" class="service-logo">
		<h2>${service.title}</h2>
		<p>Port ${service.port}</p>
    `;

    return element;
}
