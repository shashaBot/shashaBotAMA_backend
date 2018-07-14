require('dotenv').config()

const projectId = process.env.GCLOUD_PROJECT; //https://dialogflow.com/docs/agents#settings
const sessionId = 'new-session';		// should create new session for each new user
const languageCode = 'en';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


// Send request and log result
module.exports = (query, callback) => {
	// The text query request.
	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				text: query,
				languageCode: languageCode,
			},
		},
	};

	return sessionClient
		.detectIntent(request)
		.then(responses => {
			console.log('Detected intent');
			console.log('responses', responses)
			const result = responses[0].queryResult;
			console.log(`  Query: ${result.queryText}`);
			console.log(`  Response: ${result.fulfillmentText}`);
			if (result.intent) {
				console.log(`  Intent: ${result.intent.displayName}`);
				return callback(null, result)
			} 
			else if(result.action) {
				console.log(` Action matched without intent: ${result.action}`)
				return callback(null, result)
			} 
			else {
				console.log(`  No intent matched.`);
				return callback(new Error('No intent matched'))
			}
		})
		.catch(err => {
			console.error('ERROR:', err);
			return callback(err)
		});
}
