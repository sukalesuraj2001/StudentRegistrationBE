import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database';
import { CrudModule } from './crud/crud.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    CrudModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('DB connected successfully!');
      } else {
        console.error('Failed to connect to the database.');
      }
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
}
