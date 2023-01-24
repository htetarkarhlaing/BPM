import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const validator = (req: Request, res: Response, next: NextFunction) => {
	const clientApiKey = req.headers["x-api-key"];
	if (!clientApiKey) {
		return res.status(403).json({ success: false, data: "API key not found." });
	} else {
		const { clients } = new PrismaClient();
		clients
			.findMany({
				select: {
					id: true,
					secretKey: true,
				},
			})
			.then((serverAPIKeys) => {
				if (
					serverAPIKeys.filter(
						(serverKeys) => serverKeys.secretKey === clientApiKey
					)
				) {
					next();
				} else {
					return res
						.status(403)
						.json({ success: false, data: "Invalid Secret Key." });
				}
			})
			.catch((err) => {
				return res
					.status(500)
					.json({ success: false, data: "Internal Server Error Occured." });
			});
	}
};

export default validator;
