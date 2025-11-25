import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (!apiKey) {
            console.warn('GEMINI_API_KEY not found in environment variables');
        }
        this.genAI = new GoogleGenerativeAI(apiKey || '');
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    }

    async generateReviewer(
        topic: string,
        count: number,
        pdfSnippet: string,
        videoSummary: string,
        format: string,
    ) {
        const prompt = this.buildPrompt(topic, count, pdfSnippet, videoSummary, format);

        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return this.parseReviewerPayload(text);
    }

    async analyzeVideo(base64Video: string, mimeType: string) {
        const prompt = `Analyze this educational video and provide a comprehensive summary including:
1. Main topics and concepts covered
2. Key points and important information
3. Any examples, demonstrations, or case studies mentioned
4. Important terminology or definitions
5. Overall learning objectives

Provide a detailed summary that captures all the educational content.`;

        const result = await this.model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Video,
                },
            },
        ]);

        const response = await result.response;
        return { summary: response.text() };
    }

    private buildPrompt(
        topic: string,
        count: number,
        pdfSnippet: string,
        videoSummary: string,
        format: string,
    ): string {
        const topicDirective = topic
            ? `Study request: ${topic}.`
            : 'Study request: derive the most important takeaways from the provided reference.';

        let referenceBlock = '';
        if (pdfSnippet && videoSummary) {
            referenceBlock = `Reference materials (keep confidential, summarize for the learner):

PDF excerpt:
"""
${pdfSnippet}
"""

Video summary:
"""
${videoSummary}
"""`;
        } else if (pdfSnippet) {
            referenceBlock = `Reference excerpt (keep confidential, summarize it for the learner):
"""
${pdfSnippet}
"""`;
        } else if (videoSummary) {
            referenceBlock = `Video summary (keep confidential, summarize it for the learner):
"""
${videoSummary}
"""`;
        } else {
            referenceBlock =
                'No reference materials uploaded — rely on the study request alone.';
        }

        const formatDirective =
            format === 'identification'
                ? `Quiz style: identification / short-answer. For every quizItems entry, include "questionType": "identification" and an "answerText" string containing the expected response. Do not return "choices" or "answerIndex" for this mode.`
                : `Quiz style: multiple choice. Each quizItems entry must include "questionType": "multiple-choice", four concise "choices", and "answerIndex" pointing to the correct option.`;

        return `You are an expert study coach. ${topicDirective}
${referenceBlock}
${formatDirective}
Return ONLY a JSON object inside one fenced code block using this schema:
{
  "reviewerEntries": [
    { "term": "...", "definition": "...", "keyTakeaway": "...", "memoryHook": "..." }
  ],
  "quizItems": [
    { "question": "...", "questionType": "...", "choices": [...], "answerIndex": 0, "answerText": "..." }
  ]
}

Generate exactly ${count} reviewer entries and ${count} quiz items.
- Each reviewer entry must have a concise term and a clear definition.
- keyTakeaway and memoryHook are optional but recommended.
- When in multiple-choice mode, supply 4 concise, distinct choices and set answerIndex to the zero-based correct choice.
- When in identification mode, skip choices entirely and respond with an informative answerText worth 3-6 words.
- Use neutral, factual tone. Avoid markdown, LaTeX, or stray commentary.`;
    }

    private parseReviewerPayload(text: string) {
        const match =
            text.match(/```json\s*([\s\S]*?)```/i) ||
            text.match(/```\s*([\s\S]*?)```/i);
        if (!match) {
            throw new Error('Gemini response missing JSON block.');
        }
        const payload = JSON.parse(match[1]);
        if (
            !Array.isArray(payload.reviewerEntries) ||
            payload.reviewerEntries.length === 0
        ) {
            throw new Error('Reviewer entries missing from Gemini response.');
        }
        if (!Array.isArray(payload.quizItems) || payload.quizItems.length === 0) {
            throw new Error('Quiz items missing from Gemini response.');
        }
        return payload;
    }
}
