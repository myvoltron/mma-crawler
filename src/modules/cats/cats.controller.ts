import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatsPath } from './cats.constant';
import {
  AddCatBodyDTO,
  DeleteCatQueryDTO,
  GetCatsOkResponseDTO,
  UpdateCatBodyDTO,
  UpdateCatQueryDTO,
} from './cats.dto';
import { DeleteCatQueryPipe, UpdateCatQueryPipe } from './cats.pipe';
import { CatsService } from './cats.service';

@ApiTags(CatsPath.Root)
@Controller(CatsPath.Root)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @ApiOperation({ summary: '추가된 고양이 목록을 조회합니다.' })
  @ApiOkResponse({ type: GetCatsOkResponseDTO, isArray: true })
  @Get()
  async getCats(): Promise<GetCatsOkResponseDTO[]> {
    return this.catsService.getCats();
  }

  /**
   * @todo user 기능이 추가되었을 때, 회원 인가를 통해서 고양이 정보를 추가할 수 있도록 기능 추가가 필요
   */
  @ApiOperation({ summary: '고양이를 추가합니다.' })
  @ApiCreatedResponse({ type: GetCatsOkResponseDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async addCat(@Body() body: AddCatBodyDTO): Promise<GetCatsOkResponseDTO> {
    return this.catsService.addCat(body);
  }

  /**
   * @todo user 기능이 추가되었을 때, 회원 인가를 통해서 고양이 정보를 수정할 수 있도록 기능 추가가 필요
   */
  @ApiOperation({ summary: '기존에 추가되었던 고양이의 정보를 수정합니다.' })
  @ApiOkResponse({ type: GetCatsOkResponseDTO })
  @Put(`/${CatsPath.Idx}`)
  async updateCat(@Query(UpdateCatQueryPipe) query: UpdateCatQueryDTO, @Body() body: UpdateCatBodyDTO) {
    this.catsService.updateCat(query, body);
  }

  /**
   * @todo user 기능이 추가되었을 때, 회원 인가를 통해서 고양이 정보를 삭제할 수 있도록 기능 추가가 필요
   */
  @ApiOperation({ summary: '기존에 추가되었던 고양이 정보를 삭제합니다.' })
  @ApiOkResponse({ type: GetCatsOkResponseDTO })
  @Delete(`/${CatsPath.Idx}`)
  async deleteCat(@Query(DeleteCatQueryPipe) query: DeleteCatQueryDTO) {
    this.catsService.deleteCat(query);
  }
}
