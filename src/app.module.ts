import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';

// Mongodb
// user: admin
// password: TN6o7SccEp8uG83l
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:TN6o7SccEp8uG83l@cluster0.t3wvg.mongodb.net/smartranking',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    PlayersModule,
    CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
