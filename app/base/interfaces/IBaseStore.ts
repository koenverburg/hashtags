export interface IBaseStore {
  IsIdle: boolean
  IsPending: boolean
  IsCanceled: boolean
  IsFulfilled: boolean
  IsRejected: boolean
  any(): boolean

  // next-mobx-wrapper baseStore https://github.com/nghiepit/next-mobx-wrapper/blob/master/src/index.js
  update(data: object): void
}
