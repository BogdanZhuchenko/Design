!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function() {
	$(".offer .owl-carousel").owlCarousel({
		animateIn: 'zoomIn',
		dots: true,
		items: 1,
		loop: true
	});

	$(".comment .owl-carousel").owlCarousel({
		items: 1,
		dots: false,
		loop: true,
		nav: true,
		smartSpeed: 800
	});

	$('.btn-play').click(function() {
		$('.work__video').addClass('active');
		$(".work__video video").attr({"controls":"controls"});
		$('.work-video').get(0).play();
	});

	wow = new WOW(
	{
		mobile: false
	})
	wow.init();

	const offset = 150;
	const scrollUp = document.querySelector('.scroll-up');
	const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
	const pathLength = scrollUpSvgPath.getTotalLength();

	scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
	scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

	const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

	// updateDashoffset
	const updateDashoffset = () => {
		const height = document.documentElement.scrollHeight - window.innerHeight;
		const dashoffset = pathLength - (getTop() * pathLength / height)

		scrollUpSvgPath.style.strokeDashoffset = dashoffset;
	};
	// onScroll
	window.addEventListener('scroll', () => {
		updateDashoffset();

		if (getTop() > offset) {
			scrollUp.classList.add('scroll-up--active');
		}else {
			scrollUp.classList.remove('scroll-up--active');
		}
	});
	// click 
	scrollUp.addEventListener('click', (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	let modalButtons = document.querySelectorAll('.js-open-modal'),
	overlay      = document.querySelector('#js-overlay-modal'),
	closeButtons = document.querySelectorAll('.js-modal-close');

	modalButtons.forEach(function(item){

		item.addEventListener('click', function(e) {

			e.preventDefault();

			let modalId = this.getAttribute('data-modal'),
			modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

			modalElem.classList.add('active');
			overlay.classList.add('active');
		}); // end click

	}); // end foreach

	closeButtons.forEach(function(item){

		item.addEventListener('click', function(e) {
			let parentModal = this.closest('.modal');

			parentModal.classList.remove('active');
			overlay.classList.remove('active');
		});

	}); // end foreach

	document.body.addEventListener('keyup', function (e) {
		let key = e.keyCode;

		if (key == 1000) {

			document.querySelector('.modal.active').classList.remove('active');
			document.querySelector('.overlay').classList.remove('active');
		};
	}, false);

	overlay.addEventListener('click', function() {
		document.querySelector('.modal.active').classList.remove('active');
		this.classList.remove('active');
	});


	document.querySelectorAll('.tabs-triggers__item').forEach((item) =>
	item.addEventListener('click', function(e) {
		e.preventDefault();
		const id = e.target.getAttribute('href').replace('#', '');

		document.querySelectorAll('.tabs-triggers__item').forEach(
			(child) => child.classList.remove('tabs-triggers__item--active')
			);
		document.querySelectorAll('.tabs-content__item').forEach(
			(child) => child.classList.remove('tabs-content__item--active')
			);

		item.classList.add('tabs-triggers__item--active');
		document.getElementById(id).classList.add('tabs-content__item--active');
		})
	);

	document.querySelector('.tabs-triggers__item').click();

});



