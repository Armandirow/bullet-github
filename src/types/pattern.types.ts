import { BulletColor, type BulletNumber } from './bullet.types'

export type PatternColumn = 1 | 2 | 3 | 4 | 5
export type PatternRow = 1 | 2 | 3 | 4 | 5

export type Pattern = {
  id: PatternName
  name: string
  columnLength: PatternColumn
  rowLength: PatternRow
  grid: PatternGridElement[][]
}

//prettier-ignore
export type PatternGridElement<T extends PatternElementType = PatternElementType> =
  T extends PatternElementType.BLANK ? BlankCase : 
  T extends PatternElementType.NO_BULLET ? NoBulletCase : 
  T extends PatternElementType.ANY_BULLET ? AnyBulletCase : 
  T extends PatternElementType.DESTROY ? DestroyCase : 
  T extends PatternElementType.COLORED_BULLET ? ColoredBulletCase : 
  T extends PatternElementType.NUMBERED_BULLET ? NumberedBulletCase :
  T extends PatternElementType.SAME_NUMBER ? SameNumberCase : 
  { type: T }

export enum PatternElementType {
  BLANK = 'BLANK',
  NO_BULLET = 'NO_BULLET',
  ANY_BULLET = 'ANY_BULLET',
  DESTROY = 'DESTROY',
  COLORED_BULLET = 'COLORED_BULLET',
  NUMBERED_BULLET = 'NUMBERED_BULLET',
  SAME_NUMBER = 'SAME_NUMBER'
}

export type BlankCase = { type: PatternElementType.BLANK }
export type NoBulletCase = { type: PatternElementType.NO_BULLET }
export type AnyBulletCase = {
  type: PatternElementType.ANY_BULLET
  isdestroyed: boolean
}
export type DestroyCase = {
  type: PatternElementType.DESTROY
  isdestroyed: true
}
export type ColoredBulletCase = {
  type: PatternElementType.COLORED_BULLET
  color: BulletColor
}
export type NumberedBulletCase = {
  type: PatternElementType.NUMBERED_BULLET
  number: BulletNumber
}
export type SameNumberCase = {
  type: PatternElementType.SAME_NUMBER
  isSameNumber: true
}

const BLANK: PatternGridElement<PatternElementType.BLANK> = {
  type: PatternElementType.BLANK
}
const ANY_BULLET: PatternGridElement<PatternElementType.ANY_BULLET> = {
  type: PatternElementType.ANY_BULLET,
  isdestroyed: false
}
const SAME_NUMBER: PatternGridElement<PatternElementType.SAME_NUMBER> = {
  type: PatternElementType.SAME_NUMBER,
  isSameNumber: true
}
const ANY_BULLET_DESTROY: PatternGridElement<PatternElementType.ANY_BULLET> = {
  type: PatternElementType.ANY_BULLET,
  isdestroyed: true
}
const DESTROY: PatternGridElement<PatternElementType.DESTROY> = {
  type: PatternElementType.DESTROY,
  isdestroyed: true
}
const NO_BULLET: PatternGridElement<PatternElementType.NO_BULLET> = {
  type: PatternElementType.NO_BULLET
}

const RED_BULLET: PatternGridElement<PatternElementType.COLORED_BULLET> = {
  type: PatternElementType.COLORED_BULLET,
  color: BulletColor.RED
}
const BLUE_BULLET: PatternGridElement<PatternElementType.COLORED_BULLET> = {
  type: PatternElementType.COLORED_BULLET,
  color: BulletColor.BLUE
}
const GREEN_BULLET: PatternGridElement<PatternElementType.COLORED_BULLET> = {
  type: PatternElementType.COLORED_BULLET,
  color: BulletColor.GREEN
}
const YELLOW_BULLET: PatternGridElement<PatternElementType.COLORED_BULLET> = {
  type: PatternElementType.COLORED_BULLET,
  color: BulletColor.YELLOW
}
const PURPLE_BULLET: PatternGridElement<PatternElementType.COLORED_BULLET> = {
  type: PatternElementType.COLORED_BULLET,
  color: BulletColor.PURPLE
}
const BULLET_NUMBER_3: PatternGridElement<PatternElementType.NUMBERED_BULLET> = {
  type: PatternElementType.NUMBERED_BULLET,
  number: 3
}

export enum PatternName {
  ESFIR_PATTERN_1,
  ESFIR_PATTERN_2,
  ESFIR_PATTERN_3,
  ESFIR_PATTERN_4,
  ESFIR_PATTERN_5,
  ESFIR_PATTERN_6,
  ESFIR_PATTERN_7,
  ESFIR_PATTERN_8,
  ESFIR_PATTERN_9,
  ESFIR_PATTERN_10
}

//prettier-ignore
export const esfirPatterns: Pattern[] = [
  {
    id: PatternName.ESFIR_PATTERN_1,
    name: 'Etoile filante',
    columnLength: 1,
    rowLength: 5,
    grid: [
      [YELLOW_BULLET],
      [ANY_BULLET   ], 
      [DESTROY      ], 
      [DESTROY      ], 
      [DESTROY      ]
    ]
  },
  {
    id: PatternName.ESFIR_PATTERN_2,
    name: 'Vitessse de libération',
    columnLength: 5,
    rowLength: 1,
    grid: [[ANY_BULLET, DESTROY, DESTROY, DESTROY, ANY_BULLET]]
  },
  {
    id: PatternName.ESFIR_PATTERN_3,
    name: "Fracass'étoile",
    columnLength: 4,
    rowLength: 3,
    grid: [
      [ANY_BULLET, BLANK  , BLANK  , BLANK  ],
      [ANY_BULLET, DESTROY, DESTROY, DESTROY],
      [ANY_BULLET, BLANK  , BLANK  , BLANK  ]
    ]
  },
  {
    id: PatternName.ESFIR_PATTERN_4,
    name: "Flottement libre",
    columnLength: 3,
    rowLength: 2,
    grid: [
      [DESTROY   , ANY_BULLET , DESTROY   ],
      [ANY_BULLET, DESTROY    , ANY_BULLET],
    ]
  },
  {
    id: PatternName.ESFIR_PATTERN_5,
    name: "Déluge de gravitons",
    columnLength: 3,
    rowLength: 2,
    grid: [
      [SAME_NUMBER , BLANK   , SAME_NUMBER ],
      [DESTROY     , DESTROY , DESTROY     ],
    ]
  },
  {
    id: PatternName.ESFIR_PATTERN_6,
    name: "Croc Noir",
    columnLength: 3,
    rowLength: 3,
    grid: [
      [ANY_BULLET , BLANK   , ANY_BULLET ],
      [ANY_BULLET , BLANK   , ANY_BULLET ],
      [DESTROY    , DESTROY , DESTROY    ],
    ]
  },
  {
    id: PatternName.ESFIR_PATTERN_7,
    name: "Supernova",
    columnLength: 2,
    rowLength: 3,
    grid: [
      [BLANK      , DESTROY ],
      [ANY_BULLET , DESTROY ],
      [RED_BULLET , DESTROY ],
    ]
  },
  {
    id: PatternName.ESFIR_PATTERN_8,
    name: "Puits de gravité",
    columnLength: 3,
    rowLength: 3,
    grid: [
      [DESTROY   , DESTROY         , DESTROY   ],
      [NO_BULLET , BULLET_NUMBER_3 , NO_BULLET ],
      [BLANK     , NO_BULLET       , BLANK     ],
    ]
  },
  {
    id: PatternName.ESFIR_PATTERN_9,
    name: "Force Insoutenable",
    columnLength: 2,
    rowLength: 3,
    grid: [
      [DESTROY , ANY_BULLET ],
      [DESTROY , ANY_BULLET ],
      [DESTROY , ANY_BULLET ],
    ]
  },
  {
    id: PatternName.ESFIR_PATTERN_10,
    name: 'Collisionneur 190.000.000G',
    columnLength: 5,
    rowLength: 1,
    grid: [[NO_BULLET, NO_BULLET, DESTROY, DESTROY, DESTROY]]
  },
]
