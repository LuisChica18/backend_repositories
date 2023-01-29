import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from './repositories/repositories.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    RepositoriesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
//      url: process.env.DB_URL,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize:true // produccion false, se puede manejar como variable de entorno 
    }),
    OrganizationModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
