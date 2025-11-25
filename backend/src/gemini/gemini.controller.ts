import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('api')
export class GeminiController {
    constructor(private readonly geminiService: GeminiService) { }

    @Post('generate-reviewer')
    async generateReviewer(
        @Body() body: {
            topic: string;
            count: number;
            pdfSnippet?: string;
            videoSummary?: string;
            format: string;
        },
    ) {
        try {
            return await this.geminiService.generateReviewer(
                body.topic,
                body.count,
                body.pdfSnippet || '',
                body.videoSummary || '',
                body.format,
            );
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to generate reviewer',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('analyze-video')
    async analyzeVideo(
        @Body() body: { base64Video: string; mimeType: string },
    ) {
        try {
            if (!body.base64Video || !body.mimeType) {
                throw new HttpException(
                    'Video data and mimeType are required',
                    HttpStatus.BAD_REQUEST,
                );
            }
            return await this.geminiService.analyzeVideo(
                body.base64Video,
                body.mimeType,
            );
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to analyze video',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
