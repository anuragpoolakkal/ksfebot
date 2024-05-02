# Bilingual AI-Powered Customer Support WhatsApp Chatbot for KSFE

The Kerala State Financial Enterprises Ltd (KSFE) is a leading public sector financial institution in Kerala. It is a Miscellaneous Non-Banking Company fully owned by Government of Kerala providing services like chit funds, deposits and loans.

KSFE is one of the most profit-making public sector undertaking in Kerala with a revenue of more than ₹73,000 crore (US$8.8 billion) having more than 8300 employees and more than 670 branches.

[Mini Report](https://github.com/anuragpoolakkal/ksfebot/blob/main/documents/report.pdf)

## WhatsApp bot Setup Instructions for KSFE
### 1: Setup Facebook Developers

1. Open [developers.facebook.com](http://developers.facebook.com) and choose “Create New App”.
2. Select usecase: ‘Other” → Select app type: “Business” → Add and app name, email and select a business account (KSFE’s Facebook Page) → Enter password to continue.
3. Choose WhatsApp as a Product to finish the process.
4. Setup test numbers.a

Or follow [this tutorial](https://www.youtube.com/watch?v=tzRUzuaXV5A).

### 2: Setup code and server

1. Fork the GitHub repository [anuragpoolakkal/ksfebot](https://github.com/anuragpoolakkal/ksfebot) OR download the code, create a new repository and upload the code into it.
2. Create `.env` file and copy & paste the content of .env.example fileinto it.
3. Fill credentials of services used in the application.
    1. Facebook Developers: Get ACCESS_TOKEN and PHONE_NUMBER_ID. You can set a secret string as VERIFY_TOKEN. This token will be needed to set CallbackURL in step 5.
    2. OpenAI: Create an API Key by logging into your OpenAI account. Our finetuned model id (email me at [anuragrajanp@gmail.com](mailto:anuragrajanp@gmail.com) for it) can be used as model.
    3. Credentials for @googlecloud/translate is required for translation services used in the application. The setup can be done by following [this video](https://www.youtube.com/watch?v=Sjl9ilOpHG8).
    4. MongoDB credentials are required to store user details when they use ‘Request a call’ feature. Create a MongoDB database and paste the URI in .env file.
4. Host the application in a server. Eg: Railway.app
5. Open [developers.facebook.com](http://developers.facebook.com) → Setup Webhook CallbackURL in https://{SERVER_URL}/endpoint format. E.g., if server URL is ksfe.example.com, then set callback URL as https://ksfe.example.com/endpoint. Enter your verify token to finish.

### 3: Facebook Business Verification

The application is now in test mode, in a test phone number. It can only serve 5 verified users.
To add our phone number as the number people can use to access the bot, you’ve to create a WhatsApp business profile in business.facebook.com.
To make it available for users, business verification has to be done in business.facebook.com.
I cannot explain this step as I’m unable to complete it with my Facebook account.
Visit [business.facebook.com](http://business.facebook.com).