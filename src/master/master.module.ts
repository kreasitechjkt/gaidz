import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterDistrictEntity, MasterProvinceEntity, MasterSubdistrictEntity, MasterVillageEntity } from "src/db";
import { MasterDistrictService, MasterProvinceService, MasterSubdistrictService, MasterVillageService } from "./providers";
import { MasterDistrictController, MasterProvinceController, MasterSubdistrictController, MasterVillageController } from "./controllers";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MasterProvinceEntity,
      MasterDistrictEntity,
      MasterSubdistrictEntity,
      MasterVillageEntity]),
  ],
  controllers: [MasterDistrictController, MasterProvinceController, MasterVillageController, MasterSubdistrictController],
  providers: [MasterProvinceService, MasterDistrictService, MasterSubdistrictService, MasterVillageService],
})
export class MasterModule { }

