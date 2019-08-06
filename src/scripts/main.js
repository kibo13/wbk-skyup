function sleep(ms) {
	ms += new Date().getTime();
	while (new Date() < ms) { }
}

sleep(20);

document.body.onload = function () {
	setTimeout(function () {
		var preloader = document.getElementById('preloader');
		if (!preloader.classList.contains('done')) {
			preloader.classList.add('done');
		}
	}, 1500);
};

$(document).ready(function () {

	/* ============================= */
	/* control active link on scroll */
	/* ============================= */

	var lastId,
		topMenu = $(".menu"),
		topMenuHeight = topMenu.outerHeight() + 15,
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation

	menuItems.click(function (e) {
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top;
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 1500);
		e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function () {

		// Get container scroll position
		var fromTop = $(this).scrollTop() + topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function () {
			if ($(this).offset().top < fromTop)
				return this;
		});

		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
				.parent().removeClass("active")
				.end().filter("[href='#" + id + "']").parent().addClass("active");
		}
	});

})