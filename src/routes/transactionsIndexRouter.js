const router = express.Router();
import express from "express"

import transactionsRouter from "./transactionsRouter.js"
import optionsRouter from "./optionsRouter.js"

router.use("/", transactionsRouter);
router.use("/options", optionsRouter)


export default router;
