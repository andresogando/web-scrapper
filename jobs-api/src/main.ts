import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ["debug"],
  });

  const config = new DocumentBuilder()
    .setTitle("Jobs Api")
    .setDescription("The Jobs API")
    .setVersion("1.0")
    .addTag("jobs")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  await app
    .listen(PORT)
    .then((res) =>
      console.info(`🚀 Server Running on http://localhost:${PORT} 🚀`)
    );
}
bootstrap();
