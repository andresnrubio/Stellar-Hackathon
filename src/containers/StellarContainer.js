import Stellar from "stellar-sdk";
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
}

export default StellarContainer;
