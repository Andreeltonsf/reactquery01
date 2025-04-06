export function sleep(delay = 1500) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}
