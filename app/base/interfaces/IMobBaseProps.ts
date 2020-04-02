import { ReactNode, HTMLAttributes } from 'react'
export interface IBaseMobxProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

// export interface IBaseProps<DataType> extends HTMLAttributes<HTMLElement> {
//   data: DataType
//   error: {} | string
//   status: string
//   children?: ReactNode
// }
