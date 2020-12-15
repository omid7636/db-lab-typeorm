import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()
    .setTitle('Our Awesome App')
    .setDescription("Our Awesome App's Documentation")
    .setVersion('0.0.1')
    .addTag('App')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('', app, document)

  await app.listen(3000)
}
bootstrap()
