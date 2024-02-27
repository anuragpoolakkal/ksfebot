import { BufferMemory } from "langchain/memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

import { basePrompt } from "./constants/english.js";

const llm = new OpenAI({
    modelName: process.env.MODEL,
    openAIApiKey: process.env.OPENAI_API_KEY,
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    temperature: 0,
});

const prompt = PromptTemplate.fromTemplate(basePrompt);

const llmMemory = new BufferMemory({ memoryKey: "chat_history" });

const conversationChain = new LLMChain({
    llm,
    prompt,
    verbose: true,
    memory: llmMemory,
});

const res1 = await conversationChain.invoke({ question: "What is your name?" });
const res2 = await conversationChain.invoke({
    question: "What did I just ask you?",
});

console.log(res1);

console.log(res2);
