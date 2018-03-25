var Alexa = require('alexa-sdk');
// var AmazonDateParser = require('amazon-date-parser');

var roleSlot = undefined;
var source = undefined;
var date = undefined;
var time = undefined;
var destination = undefined;
var phoneNo = undefined;
const APP_ID = undefined;
const awsSDK = require('aws-sdk');
const documentClient = new awsSDK.DynamoDB.DocumentClient();
var searchResultMessage = undefined;
var tempMessage = " ";
var No = undefined;
var yesOrNo = undefined;
var driverArray=[];

var handlers = {
  'LaunchRequest': function () {

    this.emit(':ask', 'Are you a Driver or a Rider?', 'Please let me know if you are rider or a driver');
  },
  'DriverOrRider': function () {
    //this.emit(':tell', 'Hello World!');
    roleSlot = this.event.request.intent.slots.role.value;

    this.emit(':ask', 'Your role is: '+roleSlot+'. What is your source and destination?');

  },
  'FromToIntent': function () {
    source = this.event.request.intent.slots.source.value;
    destination = this.event.request.intent.slots.destination.value;
    //this.emit(':tell', 'Your source is' +from+ ' and destination is'+ destination);
    this.emit(':ask', 'What is your date and time?');
  },
  'DateAndTime': function () {
    date = this.event.request.intent.slots.Date.value;
    time = this.event.request.intent.slots.Time.value;
    if(roleSlot.toUpperCase() == "DRIVER"){
    this.emit(':ask', 'What is your Phone Number');
    }else{
    /*awsSDK.config.region = 'us-east-1';
    var sns = new awsSDK.SNS();

    var params = {
      Message: 'this is a test message',
      MessageStructure: 'string',
      PhoneNumber: '+17064614428'
    };

    sns.publish(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });*/


    //get starts here!
    var SourceToReturn=undefined;
    var self = this;
  var params = {
          ExpressionAttributeValues: {
            ":s":source,
             ":d":destination,
             ":date":date
           },
        KeyConditionExpression: "#Date = :date",
         FilterExpression: "#Source = :s and Destination = :d",
         TableName: "tblDriver",
         ExpressionAttributeNames: {
              "#Source": "Source",
              "#Date":"Date"
            }
        };

        documentClient.query(params, function(err, data) {

         if (err)
         {

           // this.emit(':tell','error found');
            console.log("error:"+err);
            self.emit(':tell','You failed miserably');
         }
         else
         {

           // this.emit(':tell','data found');
            console.log("data succeeded:");
            var counter = 1;
            data.Items.forEach(item => {
                      tempMessage = tempMessage + " "+counter + " . The ride is at "+ item.Time+". ";
                                      console.log(item.Date);
                                       console.log(item.Time);
                                       console.log(item.Destination);
                                       console.log(item.Phone);
                                       console.log(item.Source);
                                driverArray.push(item.Phone)
                counter++;
                  });
          searchResultMessage = "Here are your search results. "+ tempMessage+" Select any number or do you want me to repeat?";
          self.emit(':ask', searchResultMessage);
         }
        });
       //get ends here


      //searchResultMessage = "Here are your search results "+ tempMessage+" Select any number or do you want me to repeat?";
     //self.emit(':ask', searchResultMessage);
    }
  },

  'IntentNumber': function(){
    No = this.event.request.intent.slots.no.value;
    searchResultMessage = "The Drivers phone number is, " +"<say-as interpret-as=\"digits\">"+driverArray[No-1]+ "</say-as>"+" . You can text him directly. Do you want me to repeat?"
    this.emit(':ask',searchResultMessage);
  },

  'IntentReiterate': function(){
    yesOrNo = this.event.request.intent.slots.YesOrNo.value;
    if(yesOrNo.toUpperCase() == "YES"){
      this.emit(':ask', searchResultMessage);
    }else{
      this.emit(':ask', 'Please select any number')
    }
  },

  'PhoneNumber': function () {
    phoneNo = this.event.request.intent.slots.PhoneNo.value;

    var self = this;

    const dynamoParams = {
      TableName: "tblDriver",
              Item: {
                Phone: phoneNo,
                Date: date,
                Destination: destination,
                Time: time,
                Source: source
                    }
                };
      documentClient.put(dynamoParams, function(err, data) {
        if (err){
          //console.log(err);
          self.emit(':tell', 'Okay, I have noted it. If anyone wants to ride with you, he or she will contact you');
        }
        else{
          //console.log(data);
          self.emit(':tell', 'Okay, I have noted it. If anyone wants to ride with you, he or she will contact you');
        }
      });

    //this.emit(':tell', 'Okay, I have noted it. If anyone wants to ride with you, he or she will contact you');

  },
  'Unhandled': function () {
    this.emit(':tell', 'Sorry, I don\'t know what to do');
  },
  'AMAZON.HelpIntent': function () {
      this.emit(':ask', "What can I help you with?", "How can I help?");
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tell', "Okay!");
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tell', "Goodbye!");
  },
};

exports.handler = function(event, context){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};
