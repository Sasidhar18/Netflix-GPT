import OpenAI from "openai";
import { openAiKey } from "./constants";

const client = new OpenAI({
  apiKey: openAiKey,
  dangerouslyAllowBrowser: true,
});

export default client;
