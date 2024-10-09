import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Api, ApiSearchPaginationRequest, WhereOptions } from "src/common";
import { MasterProvinceEntity } from "src/db";
import { MasterProvinceService } from "../providers";

@Controller({
  path: "v1/provinces"
})
@ApiTags("Master - Provinces")
export class MasterProvinceController {

  constructor(
    private readonly service: MasterProvinceService,
  ) {
  }

  @Get()
  async findAll(@Query() query: ApiSearchPaginationRequest) {
    const where: WhereOptions<MasterProvinceEntity> = {};
    const { data, count } = await this.service.findPagination(query, where);

    return Api.success({
      message: "success",
      result: data,
      paginations: Api.composeApiPagination(query, count),
    });
  }

  @Get('/:province_id')
  async findOne(@Param('province_id') id: string) {
    const data = await this.service.findOneBy({
      id: id,
    });

    return Api.success({
      message: "success",
      result: data,
    });
  }

}

