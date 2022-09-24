import express from "express";
const router = express.Router();
const {
    createAccount
} = await import('../controllers/Stellar.controller.js')

router.post("/create", createAccount);

// router.delete("/:id", deleteCartById);

// router.get("/:id/productos", getCartById);

// router.post("/:id/productos", addProductsToCart);

// router.delete("/:id/productos/:id_prod", deleteProductInCart);

export default router;