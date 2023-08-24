import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true,
    }),
  );
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .setTitle('BPM audio streamer')
    .setDescription(
      'The comprehensive API documentation about BPM audio Streamer',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey()
    .addTag('BPM')
    .addServer('http://localhost:3000', 'Local development')
    .addServer('https://bpm.vamvamtech.com', 'Production')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(8000);
}
bootstrap();
