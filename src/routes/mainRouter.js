const router = express.Router();
import express from "express"

import accountRouter from "./accountRouter.js"
import transactionsIndexRouter from "./transactionsIndexRouter.js"

router.use("/account", accountRouter);
router.use("/transactions", transactionsIndexRouter)
export default router;
