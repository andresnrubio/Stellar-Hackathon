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

const fundAccount = async (req, res = response) => {
  const {publicKey}= req.params;

  try {
    await StellarContainer.fundAccount(publicKey);
    res.status(200).send(`La cuenta ${publicKey} ha sido fondeada`);
  } catch {
    res.json({
      msg: "No se pudo crear la cuenta",
    });
  }
};

const checkBalance = async (req, res = response) => {
  const {publicKey}= req.params;
  console.log(publicKey)

  try {
    const balance = await StellarContainer.checkBalance(publicKey);
    // res.status(200).send(`La cuenta ${publicKey} ha sido fondeada`);
    res.json({
      balance
    });
  } catch {
    res.json({
      msg: "No se pudo crear la cuenta",
    });
  }
};

export { createAccount, fundAccount, checkBalance };
