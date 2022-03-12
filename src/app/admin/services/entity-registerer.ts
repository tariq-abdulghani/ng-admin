import { Injectable } from '@angular/core';
import { EntityViewsConfig } from '../models/entity';

export class EntityViewsRegisterer {
  constructor(private entityList: EntityViewsConfig[]) {}

  listEntities() {
    return this.entityList;
  }

  getEntityViewsConfigByLabel(label: string): EntityViewsConfig {
    //@ts-ignore
    return { ...this.entityList.find((el) => el.label == label) };
  }
  registerEntity(entity: EntityViewsConfig) {
    this.entityList.push(entity);
  }
}
