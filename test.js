import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import "dotenv/config";

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.projectId,
});

const detectLanguage = async (text) => {
    try {
        let response = await translate.detect(text);
        return response[0].language;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

detectLanguage("njan")
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });

const translateText = async (text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

translateText("ninte achante thala", "en")
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });
