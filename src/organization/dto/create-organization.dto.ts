import { IsIn, IsString, MinLength } from "class-validator";

export class CreateOrganizationDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsIn([0, 1])
    status?: number;
}
