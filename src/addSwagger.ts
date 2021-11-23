import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const addSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('discount test')
    .setDescription('The discount API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
