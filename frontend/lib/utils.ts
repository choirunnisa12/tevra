import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string): string {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatBalance(balance: bigint, decimals: number = 18): string {
  const divisor = BigInt(10 ** decimals)
  const integerPart = balance / divisor
  const fractionalPart = balance % divisor
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0')
  
  // Remove trailing zeros
  const trimmedFractional = fractionalStr.replace(/0+$/, '')
  
  if (trimmedFractional === '') {
    return integerPart.toString()
  }
  
  return `${integerPart}.${trimmedFractional}`
}

export function parseBalance(value: string, decimals: number = 18): bigint {
  const [integerPart, fractionalPart = ''] = value.split('.')
  const paddedFractional = fractionalPart.padEnd(decimals, '0').slice(0, decimals)
  return BigInt(integerPart + paddedFractional)
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString()
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
}

export function getScheduleLabel(seconds: number): string {
  if (seconds === 86400) return "Daily"
  if (seconds === 604800) return "Weekly"
  if (seconds === 2592000) return "Monthly"
  return formatDuration(seconds)
}

export function getScheduleSeconds(label: string): number {
  switch (label) {
    case "Daily":
      return 86400
    case "Weekly":
      return 604800
    case "Monthly":
      return 2592000
    default:
      return 86400
  }
}
