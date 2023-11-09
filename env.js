import "dotenv/config";

const production = {
	...process.env,
	NODE_ENV: process.env.NODE_ENV || "production",
};

const development = {
	...process.env,
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: process.env.PORT || 9000,
	Meta_WA_accessToken: process.env.Meta_WA_accessToken,
	Meta_WA_wabaId: process.env.Meta_WA_wabaId,
	Meta_WA_VerifyToken: process.env.Meta_WA_VerifyToken,
};

const fallback = {
	...process.env,
	NODE_ENV: undefined,
};

const environmentConfig = (environment) => {
	console.log(`Execution environment selected is: "${environment}"`);
	if (environment === "production") {
		return production;
	} else if (environment === "development") {
		return development;
	} else {
		return fallback;
	}
};

export { environmentConfig };
