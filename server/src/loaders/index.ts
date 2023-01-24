import expressLoader from "./express";
import Logger from "./logger";

export default async ({ expressApp }) => {
	expressLoader({ app: expressApp });
	Logger.info("Express loaded");
};
