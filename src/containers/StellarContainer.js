import Stellar from "stellar-sdk";
import axios from 'axios';

const server = new Stellar.Server("https://horizon-testnet.stellar.org");

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

  async checkBalance(publicKey) {
    try {
      return await server.loadAccount(publicKey)

      // await axios.get("/friendbot", {
      //   baseURL: "https://horizon-testnet.stellar.org",
      //   params: { addr: publicKey },
      // });
    } catch (error) {
      console.log(error.message);
    }
  }
  
}

export default StellarContainer;
