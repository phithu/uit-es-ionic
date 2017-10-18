export interface ScheduleNotiModel {
    id: any,
    sound?: string,
    at: Date,
    icon?: string,
    text: string,
    title?: string,
    data?: any,
    every?: string
}