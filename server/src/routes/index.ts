import { Router } from "express";
import track from "./track";
import clients from "./clients";

// Middlewares
import validator from "@/middlewares/validator";

export default () => {
  const app = Router();
  clients(app);
  app.use(validator);
  track(app);

  return app;
};