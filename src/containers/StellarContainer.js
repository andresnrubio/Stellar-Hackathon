import Stellar from 'stellar-sdk'

class StellarContainer {
    constructor(path) {
    }
createAccount(){
    const pair = Stellar.Keypair.random()
return {secretKey: pair.secret(), publicKey:pair.publicKey()}
}
  }
  
  export default StellarContainer;
  