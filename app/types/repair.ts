export interface Issue {
  id: string
  name: string
}

export interface RepairStep {
  title: string
  description: string
  completed: boolean
}

export interface Video {
  title: string
  channel: string
  thumbnail: string
  url: string
  views: string
}
