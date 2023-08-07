import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { Cat } from './cats.entity';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatsRepository, CatsService],
  exports: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
