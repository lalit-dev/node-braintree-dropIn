var button = document.querySelector('#submit-button');
console.log("button: ", button);
braintree.dropin.create({
  // Insert your tokenization key here
  authorization: '<tokenization_key>',
  container: '#dropin-container'
}, function (createErr, instance) {

  console.log("createErr: ", createErr);
  console.log("instance: ", instance);
  debugger

  button.addEventListener('click', function () {
    debugger
    instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
      console.log("payload: ",payload);
      console.log("requestPaymentMethodErr: ",requestPaymentMethodErr);
      debugger

      // When the user clicks on the 'Submit payment' button this code will send the
      // encrypted payment information in a variable called a payment method nonce
      $.ajax({
        type: 'POST',
        url: '/checkout',
        data: {'paymentMethodNonce': payload.nonce}
      }).done(function(result) {
        debugger
        // Tear down the Drop-in UI
        instance.teardown(function (teardownErr) {
          debugger
          if (teardownErr) {
            console.error('Could not tear down Drop-in UI!');
          } else {
            console.info('Drop-in UI has been torn down!');
            // Remove the 'Submit payment' button
            $('#submit-button').remove();
          }
        });

        if (result.success) {
          $('#checkout-message').html('<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>');
        } else {
          console.log(result);
          $('#checkout-message').html('<h1>Error</h1><p>Check your console.</p>');
        }
      });
    });
  });
});