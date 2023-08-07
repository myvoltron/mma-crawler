import { Injectable, PipeTransform } from '@nestjs/common';
import { DeleteCatQueryDTO, UpdateCatQueryDTO } from './cats.dto';

@Injectable()
export class UpdateCatQueryPipe implements PipeTransform {
  transform(value: any): UpdateCatQueryDTO {
    const result = new UpdateCatQueryDTO();
    result.idx = parseInt(value.idx, 10);
    return result;
  }
}

@Injectable()
export class DeleteCatQueryPipe implements PipeTransform {
  transform(value: any): DeleteCatQueryDTO {
    const result = new DeleteCatQueryDTO();
    result.idx = parseInt(value.idx, 10);
    return result;
  }
}
