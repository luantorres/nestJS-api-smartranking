import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly cellPhone: string;

    @IsEmail()
    readonly email: string;
}