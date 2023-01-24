import express, { Application, Request, Response, NextFunction, Errback  } from "express";
import cors from "cors";
import methodOverRide from "method-override"
import routes from "@/routes";
import config from "@/config";

export default ({ app }: { app: Application }) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");

  app.use(cors());

  app.use(methodOverRide());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req: Request, res : Response, next: NextFunction) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req:Request, res:Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  
  app.use((err, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  })}