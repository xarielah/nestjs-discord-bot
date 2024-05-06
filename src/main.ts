import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Connect to MongoDB database
  await mongoose.connect(process.env.MONGODB_URI || '');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
