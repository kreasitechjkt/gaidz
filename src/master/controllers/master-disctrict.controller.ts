import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Api, ApiSearchPaginationRequest, WhereOptions } from "src/common";
import { MasterDistrictEntity } from "src/db";
import { MasterDistrictService } from "../providers";

@Controller({
  path: "v1/disctricts"
})
@ApiTags("Master - Districts")
export class MasterDistrictController {

  constructor(
    private readonly service: MasterDistrictService,
  ) {
  }

  @Get()
  async findAll(@Query() query: ApiSearchPaginationRequest) {
    const where: WhereOptions<MasterDistrictEntity> = {};
    const { data, count } = await this.service.findPagination(query, where);

    return Api.success({
      message: "success",
      result: data,
      paginations: Api.composeApiPagination(query, count),
    });
  }

  @Get('/:district_id')
  async findOne(@Param('district_id') id: string) {
    const data = await this.service.findOneBy({
      id: id,
    });

    return Api.success({
      message: "success",
      result: data,
    });
  }

}

