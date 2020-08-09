const start_time = Date.parse(new Date());
const period = 67;
// const period = 5;

function getTime() {
	return Math.floor((Date.parse(new Date()) - start_time) / 1000);
}

function updateTimer() {
	const timer_elem = document.getElementById('timer');
	const ticks = getTime();
	const t = period - (ticks % period);
	const minutes = Math.floor(t / 60);
	const seconds = t % 60;
	timer_elem.innerHTML = minutes + ":" + ('0' + seconds).slice(-2);
	if (ticks > 0 && t >= period) {
		timer_elem.classList.add("highlight");
	}
	else {
		timer_elem.classList.remove("highlight");
	}
}

updateTimer();
const time_interval = setInterval(updateTimer, 1000);
