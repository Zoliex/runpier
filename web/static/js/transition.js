/*document.write(
	unescape("%3Cscript src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js' type='text/javascript'%3E%3C/script%3E")
);
document.write(
	unescape("%3Cscript src='https://cdn.jsdelivr.net/npm/@barba/core' type='text/javascript'%3E%3C/script%3E")
);*/

barba.init({
	transitions: [{
		name: 'opacity-transition',
		leave(data) {
			return gsap.to(data.current.container, {
				opacity: 0
			});
		},
		enter(data) {
			return gsap.from(data.next.container, {
				opacity: 0
			});
		}
	}]
})