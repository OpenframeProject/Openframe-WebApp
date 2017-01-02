/**
 * Prepend protocol on URL if it isn't present.
 * @param  {String} urlString
 * @return {String} modified URL string
 */
export const urlify = function(urlString) {
	var pat = /^https?:\/\/|^\/\//i;
	if (!pat.test(urlString)) {
		urlString = '//' + urlString;
	}
	return urlString;
}