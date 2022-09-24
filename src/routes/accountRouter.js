import express from "express";
const router = express.Router();
const {
    createAccount,
    fundAccount,
    checkBalance
} = await import('../controllers/Stellar.controller.js')

router.post("/create", createAccount);

router.put("/:publicKey", fundAccount);

router.get("/:publicKey", checkBalance);

// /.well-known/stellar.toml

// router.delete("/:id", deleteCartById);

// router.get("/:id/productos", getCartById);

// router.post("/:id/productos", addProductsToCart);

// router.delete("/:id/productos/:id_prod", deleteProductInCart);

export default router;