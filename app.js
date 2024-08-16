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

// As there can be lots of services, we need to check their status asynchronously
async function checkServiceStatus(service) {
	try {
		// Simple check, might not work for all services but for mine it's enough
		const response = await fetch(service.url, {
            method: 'HEAD',
            mode: 'no-cors'
        });

		// If there is no error, the service is online
		document.getElementById(`status-${service.id}`).innerHTML = `
			<img class="status-indicator" src="./images/status/online.svg"></span>
			<p class="status-text">Online</p>
		`;
	} catch (error) {
		document.getElementById(`status-${service.id}`).innerHTML = `
			<img class="status-indicator" src="./images/status/offline.svg"></span>
			<p class="status-text">Offline</p>
		`;
	}
}

document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');

	// Loads settings
	loadData("conf/settings.json", function(data) {
		try {
			validateSettings(data);
			if(data.host) HOST = data.host;

			if(data.background_img_path) {
				document.body.style.backgroundImage = `url(${data.background_img_path})`;
				document.body.style.backgroundSize = "cover";
			}

		} catch (error) {
			console.error("Error in settings validation: ", error);
		}
	});

    // Loads services
    loadData("conf/services.json", function(data) {
		try {
			validateServices(data);

			data.services.forEach((item, index) => {
				let service = {
					id: index,
					title: item.title,
					port: item.port,
					image: item.image,
					url: `http://${HOST}:${item.port}`
				};
				servicesArray.push(service);
			});
	
			// Sort services by port
			servicesArray.sort((a, b) => a.port - b.port);

			console.log("If you see some errors below, it's because the services are offline. It's normal.");
			servicesArray.forEach(service => {
				let serviceElement = createServiceElement(service);
				content.appendChild(serviceElement);
				checkServiceStatus(service);
			});
		} catch (error) {
			console.error("Error in services validation: ", error);
		}
    });


});

function createServiceElement(service) {
    let element = document.createElement('a');
	element.href = service.url;
    element.className = 'item hvr-grow hvr-fade';

    element.innerHTML = `
		<img src="${service.image}" alt="${service.title} logo" class="service-logo">
		<h2>${service.title}</h2>
		<p>Port ${service.port}</p>
		<div id="status-${service.id}" class="status-div">
			<img class="status-indicator" src="./images/status/offline.svg"></span>
			<p class="status-text">Offline</p>
		</div>
    `;

    return element;
}
