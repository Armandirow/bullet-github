import { esfirActions, type Action } from './action.types'
import { esfirPatterns, type Pattern } from './pattern.types'

export enum Heroine {
  ESFIR_VOLKOVA = 'ESFIR VOLKOVA'
  // ALDELHEID_BECKENBAUER = 'ALDELHEID BECKENBAUER',
  // EKOLU_KAPAKAHI = 'EKOLU KAPAKAHI'
}

export type HeroineInformations = {
  handSize: number;
  apNumber: number
  actions: Action[]
  patterns: Pattern[]
}

const esfirInformations: HeroineInformations = {
    apNumber: 7,
    handSize: 4,
    actions: esfirActions,
    patterns: esfirPatterns,
}

export const heroinesInformationsMap = { [Heroine.ESFIR_VOLKOVA]: esfirInformations }
