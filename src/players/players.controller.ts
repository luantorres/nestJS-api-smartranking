import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { PlayersParametersValidation } from './pipes/players-parameters-validation.pipe';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {};

    @Post()
    @UsePipes(ValidationPipe)
    async CreateUpdatePlayer(
        @Body() createPlayerDto: CreatePlayerDto) {
        await this.playersService.createUpdatePlayer(createPlayerDto);
    }

    @Get()
    async GetAllPlayers(
        @Query('email', PlayersParametersValidation) email: string): Promise<Player[] | Player> {
            if (email) {
                return await this.playersService.getPlayerByEmail(email);
            } else {
                return await this.playersService.getAllPlayers();
            }
    }

    @Delete()
    async DeletePlayer(
        @Query('email', PlayersParametersValidation) email: string): Promise<void> {
            await this.playersService.deletePlayer(email);
    }
}
