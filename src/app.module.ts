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
//      url: 'postgresql://luis:zvY699YtkDpWmQL57jd6-Q@rigid-croaker-8394.7tt.cockroachlabs.cloud:26257/repositories?sslmode=verify-full',
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
