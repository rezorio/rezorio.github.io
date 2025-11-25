import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer;

async function bootstrap() {
    if (!cachedServer) {
        const expressApp = express();
        const app = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
        );
        app.enableCors();
        await app.init();
        cachedServer = serverlessExpress(expressApp);
    }
    return cachedServer;
}

export const handler = async (event, context) => {
    const server = await bootstrap();
    return server(event, context);
};
