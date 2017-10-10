export interface ExamScheduleModel {
    idStudent: string,
    nameStudent: string,
    notes: string,
    examSchedule: [
        {
            class: string,
            idClass: string,
            orderNumber: number,
            hours: string,
            date: string,
            shirt: string,
            room: string
        }
    ]
}