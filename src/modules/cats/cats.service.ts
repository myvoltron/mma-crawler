import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { AddCatBodyDTO, DeleteCatQueryDTO, UpdateCatBodyDTO, UpdateCatQueryDTO } from './cats.dto';
import { Cat } from './cats.entity';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private catsRepository: CatsRepository) {}

  createInstance(cat: DeepPartial<Cat>): Cat {
    return this.catsRepository.create(cat);
  }

  async getCats(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  async addCat(dto: AddCatBodyDTO): Promise<Cat> {
    const catInstance = this.createInstance(dto);
    return this.catsRepository.save(catInstance);
  }

  async updateCat(query: UpdateCatQueryDTO, body: UpdateCatBodyDTO) {
    return this.catsRepository.update({ idx: query.idx }, { name: body.name, kind: body.kind });
  }

  async deleteCat(query: DeleteCatQueryDTO) {
    return this.catsRepository.softDelete({ idx: query.idx });
  }
}
