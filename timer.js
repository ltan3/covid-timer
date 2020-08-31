function lpad2(n) {
	return ('0' + n.toString()).slice(-2);
}

function setValues(num_deaths, period) {
	const deaths_elem = document.getElementById('n-deaths');
	deaths_elem.innerHTML = num_deaths;
	const seconds_elem = document.getElementById('n-seconds'); 
	seconds_elem.innerHTML = period;
}

function updateTimer(start_time, period) {
	const timer_elem = document.getElementById('timer');
	const ticks = Math.floor((Date.now() - start_time) / 1000);
	const t = period - (ticks % period);
	const minutes = Math.floor(t / 60);
	const seconds = t % 60;
	timer_elem.innerHTML = minutes + ":" + lpad2(seconds);
	if (ticks > 0 && t >= period) {
		timer_elem.classList.add("highlight");
	}
	else {
		timer_elem.classList.remove("highlight");
	}
}

function start() {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	const endpoint = yesterday.getFullYear().toString() + lpad2(yesterday.getMonth()+1) + lpad2(yesterday.getDate()) + '.json';
	const api_url = 'https://api.covidtracking.com/v1/us/' + endpoint;

	console.log(api_url);

	let request = axios.get(api_url)
		.then( function(response) {

			const num_deaths = response.data.deathIncrease;
			const period = Math.round(24 * 60 * 60 / num_deaths);
			setValues(num_deaths, period);

			const start_time = Date.now();
			updateTimer(start_time, period);
			setInterval(() => updateTimer(start_time, period), 1000);

		});
}

start();