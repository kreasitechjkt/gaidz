import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Api, ApiSearchPaginationRequest, WhereOptions } from "src/common";
import { MasterVillageEntity } from "src/db";
import { MasterVillageService } from "../providers";

@Controller({
  path: "v1/villages"
})
@ApiTags("Master - Villages")
export class MasterVillageController {

  constructor(
    private readonly service: MasterVillageService,
  ) {
  }

  @Get()
  async findAll(@Query() query: ApiSearchPaginationRequest) {
    const where: WhereOptions<MasterVillageEntity> = {};
    const { data, count } = await this.service.findPagination(query, where);

    return Api.success({
      message: "success",
      result: data,
      paginations: Api.composeApiPagination(query, count),
    });
  }

  @Get('/:village_id')
  async findOne(@Param('village_id') id: string) {
    const data = await this.service.findOneBy({
      id: id,
    });

    return Api.success({
      message: "success",
      result: data,
    });
  }

}

