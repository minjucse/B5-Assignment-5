import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorhandler";
import { router } from "./app/routes";

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(cors())


app.use('/api/v1', router)

app.get("/", (req: Request, res: Response) => {
      res.send('Ride server is runnign')
})


app.use(globalErrorHandler)
// not found route will be after our global error handlers 
// app.use(notFound);
export default app;