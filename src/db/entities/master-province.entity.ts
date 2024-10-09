import { Column, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { MasterDistrictEntity } from "./master-district.entity";
import { MasterVillageEntity } from "./master-village.entity";
import { MasterSubdistrictEntity } from "./master-subdistrict.entity";

@Entity('provinsi')
export class MasterProvinceEntity {

  @PrimaryColumn({
    name: "kode",
    type: "varchar",
    length: 13,
  })
  id: string;

  @Column({
    name: "nama",
    type: "varchar",
    length: 100,
  })
  name: string;

  // ----------- RELATIONS ---------- //

  @OneToMany(() => MasterDistrictEntity, (district) => district.province)
  districts: Relation<MasterDistrictEntity[]>;

  @OneToMany(() => MasterSubdistrictEntity, (subdistrict) => subdistrict.province)
  subdistricts: Relation<MasterSubdistrictEntity[]>;

  @OneToMany(() => MasterVillageEntity, (village) => village.province)
  villages: Relation<MasterVillageEntity[]>;

}

