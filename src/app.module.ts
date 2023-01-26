import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from './repositories/repositories.module';
import { OrganizationModule } from './organization/organization.module';
import { RepositoryEntityModule } from './repository-entity/repository-entity.module';

@Module({
  imports: [
    RepositoriesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize:true // produccion false, se puede manejar como variable de entorno 
    }),
    OrganizationModule,
    RepositoryEntityModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
