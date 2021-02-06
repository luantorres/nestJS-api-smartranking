import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {};

    @Post()
    async CreateUpdatePlayer(
        @Body() createPlayerDto: CreatePlayerDto) {
        await this.playersService.createUpdatePlayer(createPlayerDto);
    }

    @Get()
    async GetAllPlayers(
        @Query('email') email: string): Promise<Player[] | Player> {
            if (email) {
                return await this.playersService.getPlayerByEmail(email);
            } else {
                return await this.playersService.getAllPlayers();
            }
    }

    @Delete()
    async DeletePlayer(
        @Query('email') email: string) {
            await this.playersService.deletePlayer(email);
    }
}
