// Handle the expand/collapse and a11y logic for each accordion block
const accordions = document.querySelectorAll(".nab-accordion");

accordions.forEach((accordion, index) => {
	const header = accordion.querySelector(".nab-accordion__header");
	const body = accordion.querySelector(".nab-accordion__body");

	const toggle = () => {
		const accordionClasses = accordion.classList;
		if (accordionClasses.contains("open")) {
			accordionClasses.remove("open");
		} else {
			accordionClasses.add("open");
		}

		const expanded = header.getAttribute("aria-expanded");
		if (expanded === "true") {
			header.setAttribute("aria-expanded", false);
			body.setAttribute("aria-hidden", true);
		} else {
			header.setAttribute("aria-expanded", true);
			body.setAttribute("aria-hidden", false);
		}
	};

	header.setAttribute("aria-controls", `nab-accordion-${index + 1}`);
	body.setAttribute("id", `nab-accordion-${index + 1}`);
	header.addEventListener("click", () => {
		toggle();
	});
	header.addEventListener("keydown", (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
			toggle();
		}
	});
});
