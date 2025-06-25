export enum BulletColor {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  PURPLE = 'purple'
}

export type BulletNumber = 1 | 2 | 3 | 4

export type BulletId = string

export type Bullet = {
  id: BulletId
  color: BulletColor
  number: BulletNumber
  isStared: boolean
  column: BulletColor
  row: number
  top: number
  left: number
  startAnimation: boolean
  isDestroying?: boolean
}

export type Bag = {
  bullets: Bullet[]
}

export type BulletContainer = Bullet | undefined

export enum Line {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  FIFTH = 5,
  SIXTH = 6
}

export type BulletColumn = [
  BulletContainer, // 0
  BulletContainer, // 1
  BulletContainer, // 2
  BulletContainer, // 3
  BulletContainer, // 4
  BulletContainer, // 5
  BulletContainer /// 6
]

export type SightBoard = {
  [BulletColor.RED]: BulletColumn
  [BulletColor.BLUE]: BulletColumn
  [BulletColor.GREEN]: BulletColumn
  [BulletColor.YELLOW]: BulletColumn
  [BulletColor.PURPLE]: BulletColumn
}

export type GridRowNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type GridColumnNumber = 1 | 2 | 3 | 4 | 5
