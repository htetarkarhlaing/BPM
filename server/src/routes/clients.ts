import { Router, Request, Response, NextFunction } from "express";
import ClientSerivce from "@/services/client.service";
const route = Router();

export default (app: Router) => {
	app.use("/clients", route);
	route.get("/", async (req: Request, res: Response, next: NextFunction) => {
		const clients = new ClientSerivce(req);
		clients.get().then((data) => {
			res.json(data)
		}).catch(err => {
			res.json(err)
		})
	});
};
