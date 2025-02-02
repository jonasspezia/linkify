import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

export async function analyzeVideo(videoData: Buffer, context: any) {
    try {
        const result = await geminiModel.generateContent([
            {
                role: 'user',
                parts: [
                    { text: context.prompt },
                    {
                        inlineData: {
                            mimeType: 'video/mp4',
                            data: videoData.toString('base64')
                        }
                    }
                ]
            }
        ]);

        return result.response?.text() || '';
    } catch (error) {
        console.error('Error analyzing video:', error);
        throw error;
    }
}
