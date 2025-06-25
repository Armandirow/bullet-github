import type { PatternColumn, PatternRow } from '@/types/pattern.types'
import { BulletColor } from '../types/bullet.types'

// Color system constants
const COLOR_SYSTEM = {
  [BulletColor.RED]: {
    colStart: 'col-start-1',
    border: 'border-red-600 bg-red-600',
    hex: '#dc2626',
    fill: 'fill-red',
    shadow: 'shadow-red',
    dropShadow: 'drop-shadow-red fill-red',
    dropShadowSm: 'drop-shadow-red-sm fill-white'
  },
  [BulletColor.BLUE]: {
    colStart: 'col-start-2',
    border: 'border-blue-600 bg-blue-600',
    hex: '#0284c7',
    fill: 'fill-blue',
    shadow: 'shadow-blue',
    dropShadow: 'drop-shadow-blue fill-blue',
    dropShadowSm: 'drop-shadow-blue-sm fill-white'
  },
  [BulletColor.GREEN]: {
    colStart: 'col-start-3',
    border: 'border-green-600 bg-green-600',
    hex: '#059669',
    fill: 'fill-green',
    shadow: 'shadow-green',
    dropShadow: 'drop-shadow-green fill-green',
    dropShadowSm: 'drop-shadow-green-sm fill-white'
  },
  [BulletColor.YELLOW]: {
    colStart: 'col-start-4',
    border: 'border-yellow-600 bg-yellow-600',
    hex: '#d97706',
    fill: 'fill-yellow',
    shadow: 'shadow-yellow',
    dropShadow: 'drop-shadow-yellow fill-yellow',
    dropShadowSm: 'drop-shadow-yellow-sm fill-white'
  },
  [BulletColor.PURPLE]: {
    colStart: 'col-start-5',
    border: 'border-purple-600 bg-purple-600',
    hex: '#7c3aed',
    fill: 'fill-purple',
    shadow: 'shadow-purple',
    dropShadow: 'drop-shadow-purple fill-purple',
    dropShadowSm: 'drop-shadow-purple-sm fill-white'
  }
} as const

// Grid system constants
const GRID_SYSTEM = {
  rowStart: {
    0: 'row-start-1',
    1: 'row-start-2',
    2: 'row-start-3',
    3: 'row-start-4',
    4: 'row-start-5',
    5: 'row-start-6',
    6: 'row-start-7'
  },
  colSpan: {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5'
  },
  rowSpan: {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
    4: 'row-span-4',
    5: 'row-span-5'
  },
  gridCols: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5'
  },
  gridRows: {
    1: 'grid-rows-1',
    2: 'grid-rows-2',
    3: 'grid-rows-3',
    4: 'grid-rows-4',
    5: 'grid-rows-5'
  }
} as const

// Color utility functions
export const getColStart = (color: BulletColor): string => COLOR_SYSTEM[color].colStart
export const getBorderColor = (color: BulletColor): string => COLOR_SYSTEM[color].border
export const getColorHexValue = (color: BulletColor): string => COLOR_SYSTEM[color].hex
export const getFillColor = (color: BulletColor): string => COLOR_SYSTEM[color].fill
export const getShadowColor = (color: BulletColor): string => COLOR_SYSTEM[color].shadow
export const getDropShadow = (color: BulletColor): string => COLOR_SYSTEM[color].dropShadow
export const getDropShadowSm = (color: BulletColor): string => COLOR_SYSTEM[color].dropShadowSm

// Grid utility functions
export const getRowStart = (number: number): string =>
  GRID_SYSTEM.rowStart[number as keyof typeof GRID_SYSTEM.rowStart] ?? ''
export const getColSpan = (number: PatternColumn): string => GRID_SYSTEM.colSpan[number]
export const getRowSpan = (number: PatternRow): string => GRID_SYSTEM.rowSpan[number]
export const getGridCols = (number: PatternColumn): string => GRID_SYSTEM.gridCols[number]
export const getGridRows = (number: PatternRow): string => GRID_SYSTEM.gridRows[number]
