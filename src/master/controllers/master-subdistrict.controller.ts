import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Api, ApiSearchPaginationRequest, WhereOptions } from "src/common";
import { MasterSubdistrictEntity } from "src/db";
import { MasterSubdistrictService } from "../providers";

@Controller({
  path: "v1/subdisctricts"
})
@ApiTags("Master - Subdistricts")
export class MasterSubdistrictController {

  constructor(
    private readonly service: MasterSubdistrictService,
  ) {
  }

  @Get()
  async findAll(@Query() query: ApiSearchPaginationRequest) {
    const where: WhereOptions<MasterSubdistrictEntity> = {};
    const { data, count } = await this.service.findPagination(query, where);

    return Api.success({
      message: "success",
      result: data,
      paginations: Api.composeApiPagination(query, count),
    });
  }

  @Get('/:subdistrict_id')
  async findOne(@Param('subdistrict_id') id: string) {
    const data = await this.service.findOneBy({
      id: id,
    });

    return Api.success({
      message: "success",
      result: data,
    });
  }

}

