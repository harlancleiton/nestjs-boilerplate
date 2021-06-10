import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const host = this.configService.get('MONGO_HOST');
    const port = this.configService.get('MONGO_PORT');
    const uri = `mongodb://${host}:${port}`;

    return {
      uri,
      dbName: this.configService.get('MONGO_DATABASE'),
      user: this.configService.get('MONGO_USERNAME'),
      pass: this.configService.get('MONGO_PASSWORD'),
      authSource: 'admin',
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    };
  }
}
