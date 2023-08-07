import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cats.entity';

@Injectable()
export class CatsRepository extends Repository<Cat> {
  constructor(@InjectRepository(Cat) private readonly repository: Repository<Cat>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
