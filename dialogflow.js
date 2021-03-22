const dialogflow = require('dialogflow');
const configs = require('./arquivo_chave');

const sessionClient = new dialogflow.SessionsClient({
    projectId: configs.project_id,
    credentials: {
        private_key: configs.private_key,
        client_email: configs.client_email,
    }
})

async function sendMessage(chatId, message){
    const sessionPath = sessionClient.sessionPath(configs.project_id, chatId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'pt-BR'
            }
        }
    }

    const response = await sessionClient.detextIntent(request);
    const result = responses[0].queryResult;
    return { text: result.fulfillmentText, intent: result.intent.displayName, fields: result.paramter.fields }
}

module.exports.sendMessage = sendMessage;