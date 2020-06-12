// This code is generated automatically using console.hashingsystems.com interface generator

const hash = require("hash-sdk"); 
  
(function(exports) { 
        /**
    * Initializes an account for interacting with below functions
    */

    exports.init = async(accountId="0.0.30707", privKey="302e020100300506032b6570042204209774270bde2b5d40ce4f588fd72eeddd4e972193b82ffce3b2ca27558d0d2c83", network="testnet") => {
        try{
            // Setting it default to software it talks to sdk directly
            await hash.setProvider('software');
            const accountData = {
                    accountId: accountId /*<accountId(0.0.1234)>*/,
                    network: network /*<mainnet | testnet>*/,
                    keys: {
                      privateKey: privKey /*<alphanumeric user privatekey>*/
                    }
                  };
            await hash.setAccount(accountData);
        }catch(e){
            console.log('Error in intializing account:::',e);
            throw e;
        }
    };

exports.myTopic = {
      messageSubmit : async(topicId="0.0.41536",message=" ", memo="node-red message") => {
          const data = {
              memo,
              topicId,
              message
          }
          return await hash.triggerMessageSubmit(data);
      }
    }; 
exports.hashSdk = hash;
})(typeof exports === 'undefined'? module.exports: exports);
    
   