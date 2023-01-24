import { Router, Request, Response, NextFunction } from "express";
const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.post(
    "/authenticate",
    async (req: Request, res: Response, next: NextFunction) => {
      
    }
  );
};