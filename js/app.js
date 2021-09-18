(function() {
	function getTabs() {
		return (
			document.getElementsByTagName("body")[0].classList.contains("no-user") ?
				["home", "join"] :
				["home", "publish", "chat", "wallet", "account"]
		);
	}

	function setTab(tab) {
		document.getElementsByTagName("body")[0].classList.remove("tab-home", "tab-publish", "tab-chat", "tab-wallet", "tab-account", "tab-join");
		document.getElementsByTagName("body")[0].classList.add("tab-" + tab);
	};

	function swipeTabs(direction) {
		const body = document.getElementsByTagName("body")[0];
		const tabs = getTabs();
		for (const [index, tab] of tabs.entries()) {
			if (body.classList.contains("tab-" + tab)) {
				setTab(tabs[(index + tabs.length + (direction === "right" ? -1 : +1)) % tabs.length]);
				break;
			}
		}
	};

	// Initialize Tab links
	document.querySelectorAll("body.app header a[data-tab]").forEach(item => {
		item.addEventListener("click", event => {
			setTab(item.dataset.tab);
			event.preventDefault();
		})
	});

	// Initialize login/out buttons
	document.querySelectorAll("body.app button").forEach(item => {
		item.addEventListener("click", event => {
			document.getElementsByTagName("body")[0].classList.toggle("no-user");
			setTab("home");
			event.preventDefault();
		})
	});

	// Swipe management
	(function() {
		let touchstartX = 0;
		let touchstartY = 0;
		let touchendX = 0;
		let touchendY = 0;

		function handleGesture(touchstartX, touchstartY, touchendX, touchendY) {
			const delx = touchendX - touchstartX;
			const dely = touchendY - touchstartY;
			if (Math.abs(delx) > Math.abs(dely)) {
				if (delx > 0) return "right"
				else return "left"
			} else if (Math.abs(delx) < Math.abs(dely)) {
				if (dely > 0) return "down"
				else return "up"
			} else return "tap"
		}

		const gestureZone = document.getElementById("main-content");
		gestureZone.addEventListener("touchstart", function(event) {
			touchstartX = event.changedTouches[0].screenX;
			touchstartY = event.changedTouches[0].screenY;
		}, false);

		gestureZone.addEventListener("touchend", function(event) {
			touchendX = event.changedTouches[0].screenX;
			touchendY = event.changedTouches[0].screenY;
			direction = handleGesture(touchstartX, touchstartY, touchendX, touchendY);
			if (direction === "left" || direction === "right") {
				swipeTabs(direction);
			}
		}, false);
	})();

})();