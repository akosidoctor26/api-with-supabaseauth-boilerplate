import OpenAI from 'openai';

export const GET = async () => {
  return Response.json({ message: 'OpenAI: Use POST' });
};

export const POST = async (request: Request) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.responses.create({
    model: 'gpt-4.1',
    input: 'Write a one-sentence bedtime story about a unicorn.',
  });

  return Response.json({ message: response.output_text });
};
