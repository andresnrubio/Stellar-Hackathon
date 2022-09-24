import Stellar from "stellar-sdk";
import axios from "axios";
import { TimeoutInfinite } from "stellar-base";

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

  async changeTrust(trustorSecret, asset, issuerPublicKey) {
    try {
      var trustor = Stellar.Keypair.fromSecret(trustorSecret);
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
                asset: toTrustAsset,
              })
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

  async checkBalance(publicKey) {
    try {
      const account = await server.loadAccount(publicKey);
      return account.balances;
    } catch (error) {
      console.log(error.message);
    }
  }

  async makePayment(senderSecretKey, receiverPublicKey, amountToTransfer) {
    try {
      var sender = Stellar.Keypair.fromSecret(senderSecretKey);

      // In previous version you would fill it mannually
      // It fetches "automatically" the base fee from the server
      const standardFee = await server.fetchBaseFee();

      // The custom options of the transaction
      const txOptions = {
        fee: standardFee,
        networkPassphrase: Stellar.Networks.TESTNET,
      };

      // The account that recieves the payment
      const paymentToReceiver = {
        destination: receiverPublicKey,
        asset: Stellar.Asset.native(),
        amount: amountToTransfer,
      };

      // The account that sends the mone'
      const senderAccount = await server.loadAccount(sender.publicKey());

      // Th transaction itself. The TransactionBuilder includes: sender acc and the options
      const transaction = new Stellar.TransactionBuilder(
        senderAccount,
        txOptions
      )
        // add the operation that I want to make, in this case "payment"
        .addOperation(Stellar.Operation.payment(paymentToReceiver))
        // setted a timeout, in this one it is "infinite", but it could be 10' 4ex
        .setTimeout(TimeoutInfinite)
        .build();

      // Transaction signature
      transaction.sign(sender);

      await server.submitTransaction(transaction);
      return {
        msg: 'Operacion realizada correctamente'
      }
    } catch (error) {
      // console.log(error.response.status);
      if (error?.response?.status === 400)
        return {
          error:
            "El saldo de la cuenta es insuficiente para realizar la transaccion",
        };
      return { error: error.message };
    }
  }
}

export default StellarContainer;
