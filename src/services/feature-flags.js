export const getFlags = function() {
	try {
		let flagsStr = localStorage.getItem('featureFlags') || null;
		let flags = flagsStr ? JSON.parse(flagsStr) : {};
		return flags;
	} catch(e) {
		return null;
	}
};

export const setFlags = function(flagsObj) {
	try {
		let flagsStr = JSON.stringify(flagsObj);
		localStorage.setItem('featureFlags', flagsStr) || null;
	} catch(e) {
		return null;
	}
};

export const setFlag = function(flag, value) {
	try {
		let flagsObj = getFlags();
		flagsObj[flag] = !!value;
		setFlags(flagsObj);
	} catch(e) {
		return null;
	}
};

export const clearFlags = function() {
	try {
		localStorage.removeItem('featureFlags');
	} catch(e) {
		// nada
	}
};