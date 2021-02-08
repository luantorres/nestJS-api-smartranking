import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { ParametersValidation } from '../common/pipes/parameters-validation.pipe';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {};

    @Post()
    @UsePipes(ValidationPipe)
    async CreatePlayer(
        @Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
            return await this.playersService.createPlayer(createPlayerDto);
        }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async UpdatePlayer(
        @Body() updatePlayerDto: UpdatePlayerDto,
        @Param('_id', ParametersValidation) _id: string): Promise<void> {
            await this.playersService.updatePlayer(_id, updatePlayerDto);
        }

    @Get()
    async GetAllPlayers(): Promise<Player[]> {
        return await this.playersService.getAllPlayers();
    }

    @Get('/:_id')
    async GetPlayerById(
        @Param('_id', ParametersValidation) _id: string): Promise<Player> {
            return await this.playersService.getPlayerById(_id);
        }

    @Delete('/:_id')
    async DeletePlayer(
        @Param('_id', ParametersValidation) _id: string): Promise<void> {
            await this.playersService.deletePlayer(_id);
        }
}
