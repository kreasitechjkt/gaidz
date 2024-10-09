import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { MasterDistrictEntity } from "./master-district.entity";
import { MasterProvinceEntity } from "./master-province.entity";
import { MasterVillageEntity } from "./master-village.entity";

@Entity('kecamatan')
export class MasterSubdistrictEntity {
  @PrimaryColumn({
    name: "kode",
    type: "varchar",
    length: 13,
  })
  id: string;

  @Column({
    name: "kode_provinsi",
    type: "varchar",
    length: 13,
  })
  province_id: string;

  @Column({
    name: "kode_kabupaten",
    type: "varchar",
    length: 13,
  })
  district_id: string;

  @Column({
    name: "nama",
    type: "varchar",
    length: 100,
  })
  name: string;

  // ----------- RELATIONS ---------- //

  @ManyToOne(() => MasterProvinceEntity)
  @JoinColumn({ name: "province_id" })
  province: Relation<MasterProvinceEntity>;

  @ManyToOne(() => MasterDistrictEntity)
  @JoinColumn({ name: "district_id" })
  district: Relation<MasterDistrictEntity>;

  @OneToMany(() => MasterVillageEntity, (village) => village.subdistrict)
  villages: Relation<MasterVillageEntity[]>;

}

