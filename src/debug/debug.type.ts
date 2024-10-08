/* eslint-disable @typescript-eslint/ban-types */
import type { Type } from '@nestjs/common';

export class ClassRef {
  [index: string]: Type;
}

export type Func = Function;
export type Metatype = Type | Func;

export type DebugModuleOptions = {
  exclude?: string[];
}

export type DebugOptions = {
  context?: string;
  exclude?: Metatype[];
}
