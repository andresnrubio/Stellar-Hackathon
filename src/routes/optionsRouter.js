import express from "express";
const router = express.Router();
const {
    setTrustline,
    authorization,
    enableAccountFlags,
} = await import('../controllers/Stellar.controller.js')

router.post("/create-trustline", setTrustline);

router.put("/authorize", authorization);

router.put("/enableAccountFlags", enableAccountFlags);

// router.delete("/:id", deleteCartById);

// router.get("/:id/productos", getCartById);

// router.post("/:id/productos", addProductsToCart);

// router.delete("/:id/productos/:id_prod", deleteProductInCart);

export default router;