import { STORAGE_KEY } from '@/enums/const'

export function getToken(): string {
  const local = localStorage.getItem(STORAGE_KEY)
  if (local === null) return ''
  // console.log(JSON.parse(local)?.user?.token || '',1212999,STORAGE_KEY,localStorage.getItem(STORAGE_KEY))
  return JSON.parse(local)?.user?.token || ''
}

export function clearStore() {
  localStorage.removeItem(STORAGE_KEY)
}
