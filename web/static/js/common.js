var active = false;
function Sidebar() {
	document.getElementById("sidebar").classList.toggle("active");
	active = !active;
}
window.addEventListener('mouseup', function (event) {
	var menu = document.getElementById('sidebar');
	if (!active) return;

	if (event.target != menu && event.target.parentNode != menu) {
		document.getElementById("sidebar").classList.toggle("active");
	}
});