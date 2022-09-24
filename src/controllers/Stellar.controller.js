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
      msg: "Unable to create account",
    });
  }
};

const fundAccount = async (req, res = response) => {
  const {publicKey}= req.params;
  try {
    await StellarContainer.fundAccount(publicKey);
    res.status(200).send(`Funds added to ${publicKey}`);
  } catch {
    res.json({
      msg: "Unable to add funds",
    });
  }
};


const setTrustline = async (req, res = response) =>{
  const { trustorSecret, asset, issuerPublicKey } = req.body;
  try {
    if(asset.length > 12){res.json({
      msg: "Asset must be 12 characters at max",
    })}else{
    await StellarContainer.changeTrust(trustorSecret, asset, issuerPublicKey);
    res.status(200).send(`Asset trusted for ${issuerPublicKey}`);
  }
  } catch {
    res.json({
      msg: "Unable to establish trustline",
    });
  }
}

const enableAccountFlags = async (req, res = response)=>{
try {
  const { secretKey } = req.body
  await StellarContainer.enableFlags(secretKey)
  res.status(200).send(`Setting flags Enable`);
} catch (error) {
  res.json({
    msg: "Unable to change authorization settings",
  });
}

}
const authorization = async (req, res = response) =>{
  const { trustorSecret, asset, issuerPublicKey, authorization} = req.body;
  try {
    if (authorization){
    await StellarContainer.Set_Trust_Line_Flag(trustorSecret, asset, issuerPublicKey);
    res.status(200).send(`${issuerPublicKey} authorized for ${asset}`);
  }else{
    await StellarContainer.changeTrust(trustorSecret, asset, issuerPublicKey);
    res.status(200).send(`Removed authorization for ${asset} to  ${issuerPublicKey}`);
  }
  } catch {
    res.json({
      msg: "Unable to change authorization settings",
    });
  }

}


const checkBalance = async (req, res = response) => {
  try {
    const {publicKey}= req.params;
    const balance = await StellarContainer.checkBalance(publicKey);
    // res.status(200).send(`La cuenta ${publicKey} ha sido fondeada`);
    res.json({
      balance
    });
  } catch {
    res.json({
      msg: "Unable to access to account balance",
    });
  }
};

export { createAccount, fundAccount, checkBalance, setTrustline, authorization, enableAccountFlags};
