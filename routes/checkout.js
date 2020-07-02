
var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId:   '<merchantId>',
    publicKey:    '<publicKey>',
    privateKey:   '<privateKey>'
  });
  debugger

  // Use the payment method nonce here
  console.log("req.body.paymentMethodNonce: ", req.body.paymentMethodNonce);
  var nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function(error, result) {
  console.log("gateway.transaction.sale  error: ", error);
  console.log("gateway.transaction.sale  result: ", result);


    debugger
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;