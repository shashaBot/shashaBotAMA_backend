# AskMeAnything Backend
The backend for talking to DialogFlow API using Node.js Client SDK.

## Development
Steps to follow
1. Create a new agent in dialogflow. This will create a project in your Google Cloud Platform. You can see its project ID in the settings of your dialogflow agent. YOu will need this soon.

2. Next, follow the steps giver [here](https://github.com/dialogflow/dialogflow-nodejs-client-v2#before-you-begin) in "Before you begin" section.

The authetication set up is a bit tricky so I'm leaving quick to point you in the right path if you get lost.
 - [Manage service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
 - [Create credentials for service account](https://console.cloud.google.com/apis/credentials)

You have to create a service account with appropriate access and then credentials for it. Download private key as json file   and store it anywhere safe on your system.
3. Fork the repo and clone your fork

4. Run ```npm install``` or ```yarn``` in root directory.

5. Make a .env file in the root directory with format as below:
```
PROJECT_ID = '<project-id>'
GOOGLE_APPLICATIONS_CREDENTIALS='full/path/to/client_secret.json'
PORT=<port-no>
```
Port is optional.

6. Run ```npm start```

## Contributing
See the issues and stay tuned to the other repo ([AskMeAnything](https://github.com/shashaBot/askmeanything)) as well :)
