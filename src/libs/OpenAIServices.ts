import { OpenAI } from 'openai'
import { ExternalContext } from '../useExternalContext'

export async function openAITranslation(
  valuToTranslate: string,
  localizationCode: string,
  context: ExternalContext
): Promise<string> {
  // Create an OpenAI API client (that's edge friendly!)

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
    baseURL: import.meta.env.VITE_APP_OPENAI_BASE_URL,
    defaultQuery: {
      'api-version': import.meta.env.VITE_APP_OPENAI_API_VERSION,
    },
    defaultHeaders: { 'api-key': import.meta.env.VITE_APP_OPENAI_API_KEY },
    dangerouslyAllowBrowser: true,
  })

  const initialResponse = await openai.chat.completions.create({
    model: 'gpt4-deploy',
    messages: [
      {
        role: 'system',
        content:
          'you are a translation service;You will return a translation from the detected language to ' +
          localizationCode +
          ', just translate the text, do not add meaning;If the text contain any HTML tag, return the translated text with the tags',
      },
      { role: 'user', content: valuToTranslate },
    ],
  })

  let translation = initialResponse.choices[0].message.content
  return translation || valuToTranslate
}

export async function visualSearchTermGenerator(
  campaignBrief: string
): Promise<string> {
  // Create an OpenAI API client (that's edge friendly!)

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
    baseURL: import.meta.env.VITE_APP_OPENAI_BASE_URL,
    defaultQuery: {
      'api-version': import.meta.env.VITE_APP_OPENAI_API_VERSION,
    },
    defaultHeaders: { 'api-key': import.meta.env.VITE_APP_OPENAI_API_KEY },
    dangerouslyAllowBrowser: true,
  })

  const initialResponse = await openai.chat.completions.create({
    model: 'gpt4-deploy',
    messages: [
      {
        role: 'system',
        content:
          'You are an intelligent marketing assistant. You will receive a brief description of a marketing campaign, including details like goals, target audience and message. Based on this information, generate the most effective and precise visual search terms to locate existing brand images in the asset repository. Do not elaborate or explain—only return the search terms pure string format, not HTML tags, max 5 terms.',
      },
      { role: 'user', content: campaignBrief },
    ],
  })

  let searchTerm = initialResponse.choices[0].message.content
  if (searchTerm) {
    searchTerm = searchTerm.replace(/[^\w\s]/gi, '').replace(/\n/g, ' ')
  }
  return searchTerm || campaignBrief
}
