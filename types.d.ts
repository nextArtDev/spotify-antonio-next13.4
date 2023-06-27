interface Options {
  title: string
  value: string
  url?: string
}
interface Doctors {
  id: number
  name: string
  illnessId: number[]
  url: string
  imageSrc: string
  specialty?: string[]
  booking?: Array<{ dayId: number; hours: string[] }>
}

interface Illness {
  id: number
  name: string
  doctorId: number[]
}
interface Days {
  id: number
  name: string
}
interface Special {
  id: number
  name: string
  doctorId: number[]
}
