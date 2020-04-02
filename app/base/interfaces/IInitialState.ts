import { Statuses } from '../enums/Statuses'

export interface IInitialState<EntityType> {
  status: Statuses
  entities: EntityType
}
