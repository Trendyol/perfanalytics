type EntitiesType = typeof import('./entities');
type EntityNames = keyof EntitiesType;

type EntityKeys<T extends EntityNames> = keyof InstanceType<EntitiesType[T]>;

type EntitiesAll = InstanceType<EntitiesType[EntityNames]>;

type Entities = {
  [EntityName in EntityNames]: { [objkey in EntityKeys<EntityName>]: any };
};
