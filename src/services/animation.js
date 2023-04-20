export const createObserver = (htmlElement, animationClassName) => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.remove("hidden");
					entry.target.classList.add(animationClassName);
				}
			});
		},
	);

	htmlElement.classList.add("hidden");
	observer.observe(htmlElement);
};