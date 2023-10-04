export class CreateStudentDto {
    readonly name: string;
    readonly surname: string;
    readonly birthDate: Date;
}
export class StudentClassDto {
    readonly studentId: number;
    readonly classId: number;
}
export class StudentAddressDto {
    readonly address: string;
    readonly studentId: number;
    readonly cityId: number;
}
export class UpdateStudentDto {
    readonly name: string;
    readonly surname: string;
    readonly birthDate: Date;
}
export class UpdateStudentClassDto {
    readonly classId: number;
}
export class UpdateStudentAddressDto {
    readonly address: string;
    readonly cityId: number;
}