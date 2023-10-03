export class CreateTeacherDto {
    readonly name: string;
    readonly surname: string;
}
export class CreateTeacherAddressDto {
    readonly address: string;
    readonly teacherId: number;
    readonly cityId: number;
}
export class UpdateTeacherDto {
    readonly name: string;
    readonly surname: string;
}
export class UpdateTeacherAddressDto {
    readonly address: string;
    readonly cityId: number;
}