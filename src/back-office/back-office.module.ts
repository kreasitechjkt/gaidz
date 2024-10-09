import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { MasterModule } from "src/master";

@Module({
  imports: [
    MasterModule,
    RouterModule.register([
      {
        path: "/back-office/master",
        module: MasterModule,
      }
    ]),
  ],
})
export class BackOfficeModule { }

