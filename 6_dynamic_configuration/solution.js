module.exports = function (configValue) {
	const controlObj = {};

	function dynamicConfigValue(value) {
		return { controlObj, value };
	}

	function makeDynamicConfig(obj) {
		let newObj;
		if (Array.isArray(obj)) newObj = [];
		else newObj = {};

		const fields = {};

		Object.keys(obj).forEach((key) => {
			if (Array.isArray(obj) && key === "length") return;
			if (obj[key]?.controlObj === controlObj) {
				fields[key] = {
					enumerable: true,
					get() { return configValue(obj[key].value) }
				}
			} else if (Object.getOwnPropertyDescriptor(obj, key).get) {
				fields[key] = Object.getOwnPropertyDescriptor(obj, key);
			} else if (typeof obj[key] === "object" && obj[key] !== null) {
				fields[key] = {
					enumerable: true,
					value: makeDynamicConfig(obj[key])
				}
			} else {
				fields[key] = {
					enumerable: true,
					value: obj[key]
				}
			}
		});

		Object.defineProperties(newObj, fields);
		return newObj;
	}

	return {
		makeDynamicConfig,
		dynamicConfigValue
	};
}