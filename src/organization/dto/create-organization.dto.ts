import { IsArray, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { Repository } from "../entities/repository.entity";
import { Tribe } from "../entities/tribe.entity";

export class CreateOrganizationDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsIn([0, 1])
    status?: number;

    @IsArray()
    @IsOptional()
    tribes?: Tribe[];
}
