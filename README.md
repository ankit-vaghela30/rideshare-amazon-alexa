# rideshare-amazon-alexa
Car-pooling app on Amazon Alexa

## Inspiration
We live in Athens, which does not have a very intensive public transportation system. We noticed that most of the cars on the road were driven by a single person. We thought that there should be some type of mean so that this single cars can be utilized. So, We got this awesome Amazon echo from MLH and started building the car pool application as a "skill" in Amazon echo.

## What it does
The Alexa application has two user roles. 
1. Driver (User who owns a car and wants to share the ride.)
2. Rider (User who does not own a car and looking for car pool.)

The app can be initiated by saying "Alexa, Ride Share".
A very common test case after initiating the app is described as below:

Driver wants to schedule a ride.

Alexa: "Are you a Driver or a Rider?"
Driver: "Driver"
Alexa: "What is your source and destination?"
Driver: "I want to go from Atlanta to Athens"
Alexa: "What is your date and time?"
Driver: "I want to go on today at 7 am"
Alexa: "What is your phone number?"
Driver: "My phone number is 9999999999"
Alexa: "Okay, I have noted it. If anyone wants to ride with you, he or she will contact you."

One session stops here... Now Rider wants to find contacts of rides.

Rider: "Alexa, Ride Share"
Alexa: "Are you a Driver or a Rider?"
Rider: "Rider"
Alexa: "What is your source and destination?"
Rider: "I want to go from Atlanta to Athens"
Alexa: "What is your date and time?"
Rider: "I want to go on today at 7 am"
Alexa: "Here are your search results. <1 The ride is at 7'0clock. 2 The ride is at 8'o clock.>(This is repeated as per search result length) Select any number or do you want me to repeat?"
Rider: "I will select 2"
Alexa: "The Drivers phone number is 9999999999. You can text him directly. Do you want me to repeat?"

Sessions ends here. So the person who wanted to find car pool got the contact of the guy who is willing to share his ride.

## How we built it

We built it almost in house in Amazon Alexa developer console. Our skill service resides in aws lambda function which is written in node.js. We used Amazon's NOSQL database system - DynamoDB to store our data. The connection to lambda function with other entities was done via trigger mechanism.

## Challenges we ran into

Here is the list:

1. The biggest challenge was to get familiar with Alexa developer Console, aws console, dynamoDB and Node.js. We were all new to these technologies hence we had to learn all of it from scratch.

2. Creating the sequential flow and the architecture of the entire system.

3. Asynchronous nature of NODE.JS was also a major obstacle. But we were able to solve it.

4. We had various small but time consuming challenges as well. One of which was rather funny; while giving the end user the phone number of Driver, Alexa was speaking phone number as regular number; "Seven Billion Six Million..."


## Accomplishments that we're proud of
1. Making an end product that we envisioned.
2. Learning the different technology stacks.

## What we learned
1. A lot of things, including, AWS, Alexa Skill Sets, DynamoDB, Node.js.
2. Time management and people's skills.
3. Software engineering skills like, peer programming, iterative testing.

## What's next for Ride-Share-Amazon-Alexa
1. The future scope of Ride-Share includes having an inbuilt communication mechanism between Rider and Driver like Email or SMS.
2. Profile Management of Riders and Drivers.
3. Rating and Feedback for Drivers and Riders.
4. Integrating a payment gateway and Google Maps with the app.

Special thanks to Amazon for their awesome tech.
