import { response } from "express";
const { stellarDao: StellarContainer } = await import("../daos/index.js");


const createAccount = async (req, res = response) => {
  try {
    const pair = await StellarContainer.createAccount()
    res.json(
      pair
    );
  } catch {
    res.json({
      msg: "No se pudo crear la cuenta",
    });
  }
};

export { createAccount };
