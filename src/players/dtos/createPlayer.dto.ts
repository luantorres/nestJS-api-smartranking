import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    readonly cellPhone: string;

    @IsNotEmpty()
    readonly email: string;
}