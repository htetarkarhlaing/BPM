import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

let totalRequests: number = 0;

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
					count: true
				},
			})
			.then((serverAPIKeys) => {
				let currentClient = serverAPIKeys.filter(
					(serverKeys) => serverKeys.secretKey === clientApiKey
				)[0];
				if (currentClient.id) {
					if(totalRequests > 1000) {
						clients.update({
							where: {
								id: currentClient.id
							},
							data: {
								count: currentClient.count + totalRequests + 1
							}
						})
						totalRequests = 0
					}
					else {
						totalRequests += 1
					}
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
