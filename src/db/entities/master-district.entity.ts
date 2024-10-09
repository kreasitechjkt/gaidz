import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { MasterProvinceEntity } from "./master-province.entity";
import { MasterSubdistrictEntity } from "./master-subdistrict.entity";
import { MasterVillageEntity } from "./master-village.entity";

@Entity('kabupaten')
export class MasterDistrictEntity {

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
    name: "nama",
    type: "varchar",
    length: 100,
  })
  name: string;

  // ----------- RELATIONS ---------- //

  @OneToMany(() => MasterVillageEntity, (village) => village.district)
  villages: Relation<MasterVillageEntity[]>;

  @OneToMany(() => MasterSubdistrictEntity, (subdistrict) => subdistrict.district)
  subdistricts: Relation<MasterSubdistrictEntity[]>;

  @ManyToOne(() => MasterProvinceEntity)
  @JoinColumn({ name: "province_id" })
  province: Relation<MasterProvinceEntity>;

}

