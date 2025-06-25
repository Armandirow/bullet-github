import type { Bullet } from './bullet.types'

export type Action<T extends ActionName = ActionName> = SimpleAction<T> | StarAction<T>

export enum ActionName {
  MOVE_LEFT_RIGHT_DOWN_ONE,
  DRAW_PATTERN,
  MOVE_UP_ONE,
  MOVE_DOWN_ANY,
  GAIN_ONE_AP
}

export type GenericAction<T extends ActionName> = {
  name: T
  description: string
  callback: (
    payload: T extends ActionName.MOVE_LEFT_RIGHT_DOWN_ONE ? { bullet: Bullet } : void
  ) => void
}

export type SimpleAction<T extends ActionName> = GenericAction<T> & {
  apCost: number
}
export type StarAction<T extends ActionName> = GenericAction<T> & {
  starAction: true
}

export const isSimpleAction = (action: Action) => 'apCost' in action
export const isStarAction = (action: Action) => 'starAction' in action

export const esfirActions: Action[] = [
  {
    apCost: 1,
    name: ActionName.MOVE_LEFT_RIGHT_DOWN_ONE,
    description: "Déplacez un projectile d'1 case vers la gauche, la droite ou le bas.",
    callback: () => {}
  },
  {
    apCost: 2,
    name: ActionName.DRAW_PATTERN,
    description: 'Piochez un motif.',
    callback: () => {}
  },
  {
    apCost: 2,
    name: ActionName.MOVE_UP_ONE,
    description: "Déplacez un projectile d'1 case vers le haut.",
    callback: () => {}
  },
  {
    apCost: 2,
    name: ActionName.MOVE_DOWN_ANY,
    description: "Déplacez un projectile de n'importe quel nombre de cases vers le bas.",
    callback: () => {}
  },
  {
    starAction: true,
    name: ActionName.GAIN_ONE_AP,
    description: 'Gagnez 1 PA.',
    callback: () => {}
  }
]
