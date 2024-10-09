import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { MasterDistrictEntity } from "./master-district.entity";
import { MasterProvinceEntity } from "./master-province.entity";
import { MasterSubdistrictEntity } from "./master-subdistrict.entity";

@Entity('desa')
export class MasterVillageEntity {

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
    name: "kode_kecamatan",
    type: "varchar",
    length: 13,
  })
  subdistrict_id: string;

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

  @ManyToOne(() => MasterDistrictEntity)
  @JoinColumn({ name: "subdistrict_id" })
  subdistrict: Relation<MasterSubdistrictEntity>;

}

