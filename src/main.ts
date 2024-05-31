import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Connect to MongoDB database
  await mongoose.connect(process.env.MONGODB_URI || '');
  const PORT = +process.env.PORT;
  await app.listen(PORT || 3000); // PRD = 42069
}
bootstrap();
