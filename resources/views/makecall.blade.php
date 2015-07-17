<?php
//session_start();

/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 5/9/15
 * Time: 7:50 PM
 */

//require('twilio-php/Services/Twilio.php');
//$sid = 'ACddcd02e4f11aecf019e81e256f6f5e37';
//$token = 'ea9a4ca372e2db399a0da0d45e4132e1';
//$client = new Services_Twilio($sid,$token);
//
//$call = $client->account->calls->create('+14158675309', '+19092801180','http://demo.twilio.com/docs/voice.xml', array());
//echo $call->sid;
//
//echo 'call made!!';

//$headers = http_get_request_headers();
//$result = http_get_request_body();

//$myFile = "log.txt";
//$fh = fopen($myFile, 'a') or die("can't open file");
//$stringData = 'it worked!!';
//fwrite($fh, $stringData);
//$stringData = 'still worked';
//fwrite($fh, $stringData);
//fclose($fh);


include 'twilio-php/Services/Twilio/Capability.php';

// put your Twilio API credentials here
$accountSid = 'AC2af87bd237bb23944bc873bb62c075a1';
$authToken  = '1233cce6cec6474cdfc156c315980ddf';

// put your Twilio Application Sid here
$appSid     = 'APf087e069806204f7ee5550b532e8c7e9';

$capability = new Services_Twilio_Capability($accountSid, $authToken);
$capability->allowClientOutgoing($appSid);
$capability->allowClientIncoming('jenny');
$token = $capability->generateToken();
//echo 'EOF';
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Hello Client Monkey 4</title>
    <script type="text/javascript" src="//static.twilio.com/libs/twiliojs/1.2/twilio.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <link href="http://static0.twilio.com/bundles/quickstart/client.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript">

      Twilio.Device.setup("<?php echo $token; ?>");

      Twilio.Device.ready(function (device) {
        $("#log").text("Ready");
      });

      Twilio.Device.error(function (error) {
        $("#log").text("Error: " + error.message);
      });

      Twilio.Device.connect(function (conn) {
        $("#log").text("Successfully established call");
      });

      Twilio.Device.disconnect(function (conn) {
        $("#log").text("Call ended");
      });

      Twilio.Device.incoming(function (conn) {
        $("#log").text("Incoming connection from " + conn.parameters.From);
        // accept the incoming connection and start two-way audio
        conn.accept();
      });

      function call() {
        // get the phone number to connect the call to
        params = {"PhoneNumber": $("#number").val()};
        Twilio.Device.connect(params);
      }

      function hangup() {
        Twilio.Device.disconnectAll();
      }
    </script>
  </head>
  <body style="background:black">
    <button class="call" onclick="call();">
      Call
    </button>

    <button class="hangup" onclick="hangup();">
      Hangup
    </button>

    <input type="text" id="number" name="number"
      placeholder="Enter a phone number to call"/>

    <div id="log">Loading pigeons...</div>
  </body>
</html>