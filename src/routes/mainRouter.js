const router = express.Router();
import express from "express"

import accountRouter from "./accountRouter.js"

router.use("/account", accountRouter);

export default router;
