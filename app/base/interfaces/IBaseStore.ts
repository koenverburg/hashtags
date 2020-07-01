export interface IBaseStore {
  IsIdle: boolean
  IsPending: boolean
  IsCanceled: boolean
  IsFulfilled: boolean
  IsRejected: boolean
  // any(): boolean
}
