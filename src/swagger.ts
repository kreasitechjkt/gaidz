import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { createLogger } from 'winston';
import { loggerOptions } from './config';
import { AuthModule } from './auth';
import { MasterModule } from './master';

/**
 * https://docs.nestjs.com/recipes/swagger
 */
async function bootstrap(): Promise<string> {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: createLogger(loggerOptions) }),
    bufferLogs: true,
  });


  const backoffice = new DocumentBuilder()
    .setTitle('OpenAPI Documentation')
    .setDescription('The sample API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const backofficeDocument = SwaggerModule.createDocument(app, backoffice, { include: [AuthModule, MasterModule] });
  SwaggerModule.setup('docs/back-office-api', app, backofficeDocument);


  app.enableShutdownHooks();
  await app.listen(process.env.PORT || 8000);

  return app.getUrl();
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, 'Swagger');
  } catch (error) {
    NestLogger.error(error, 'Swagger');
  }
})();
