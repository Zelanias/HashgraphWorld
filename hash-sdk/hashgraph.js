var hedera = require("./hedera");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function(RED) {
    function hashSubmitMessage(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', async function(msg) {
    		hedera.init("0.0.30707", "302e020100300506032b6570042204209774270bde2b5d40ce4f588fd72eeddd4e972193b82ffce3b2ca27558d0d2c83", "testnet")
            try{
                msg.payload = await hedera.myTopic.messageSubmit("0.0.47020",String(msg.payload));
                console.log(msg)
            }
            catch(e){
                msg.payload = "eh"
            }
            node.send(msg);
        });
    }
    function hashGetMessage(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', async function(msg) {

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText);
                msg.payload = this.responseText;
                node.send(msg);
            }
            });

            xhr.open("GET", "https://testnet.dragonglass.me/api/topics/0.0.47020/messages");
            xhr.setRequestHeader("X-API-KEY", "7d566cfa-8952-304e-9708-88a9dc76cad1");

            xhr.send();
        });
    }
    RED.nodes.registerType("hash-submit",hashSubmitMessage);
    RED.nodes.registerType("hash-retrieve",hashGetMessage);
}