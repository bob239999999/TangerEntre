import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Validation pipe globale
    app.useGlobalPipes(new ValidationPipe());

    // Configuration Swagger
    const config = new DocumentBuilder()
        .setTitle('Entreprise Management API')
        .setDescription('API pour la gestion des projets, tâches et utilisateurs')
        .setVersion('1.0.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter JWT token',
            },
            'JWT-auth'
        )
        .addServer('http://localhost:3000', 'Development server')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    await app.listen(3000);
    console.log('🚀 Application running on http://localhost:3000');
    console.log('📚 Swagger documentation: http://localhost:3000/api');
}

bootstrap();