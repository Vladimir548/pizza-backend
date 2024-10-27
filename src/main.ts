import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser"
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.use(cookieParser())
	app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
	// app.useGlobalPipes(new ValidationPipe)
	app.setGlobalPrefix('api')
	
	app.enableCors({
		origin: ['http://localhost:3000'],
		credentials: true,
		exposedHeaders: 'set-cookie',
	})
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
