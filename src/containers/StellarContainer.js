import Stellar from "stellar-sdk";
var server = new Stellar.Server("https://horizon-testnet.stellar.org");
import axios from 'axios';

class StellarContainer {
  constructor(path) {}
  createAccount() {
    try {
      const pair = Stellar.Keypair.random();
      return { secretKey: pair.secret(), publicKey: pair.publicKey() };
    } catch (error) {
      console.log(error.message);
    }
  }

  async fundAccount(publicKey) {
    try {
      await axios.get("/friendbot", {
        baseURL: "https://horizon-testnet.stellar.org",
        params: { addr: publicKey },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

async changeTrust(trustorSecret, asset, issuerPublicKey){
  try {
    var trustor = Stellar.Keypair.fromSecret(
      trustorSecret,
    );
    var toTrustAsset = new Stellar.Asset(asset, issuerPublicKey);
  server
  .loadAccount(trustor.publicKey())
  .then(function (receiver) {
    var transaction = new Stellar.TransactionBuilder(receiver, {
      fee: 100,
      networkPassphrase: Stellar.Networks.TESTNET,
    })
      .addOperation(
        Stellar.Operation.changeTrust({
          asset: toTrustAsset
        }),
      )
      .setTimeout(5000)
      .build();
    transaction.sign(trustor);
    return server.submitTransaction(transaction);
  })
  .then(console.log("deberia funcionar")) 
  .catch(function (error) {
    console.error("Error!", error);
  });
  } catch (error) {
    console.log(error.message);
  }
}


}

export default StellarContainer;
