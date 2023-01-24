import { Router, Request, Response, NextFunction } from "express";
const route = Router();

export default (app: Router) => {
	app.use("/clients", route);
	route.get("/", async (req: Request, res: Response, next: NextFunction) => {});
};
