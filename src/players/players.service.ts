import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

    private players: Player[] = [];
    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { email } = createPlayerDto;

        const playerFound = this.players.find(player => player.email === email);

        if (playerFound) {
            this.update(playerFound, createPlayerDto);
        } else {
            this.create(createPlayerDto);
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        return this.players;
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const playerFound = this.players.find(player => player.email === email);

        if (!playerFound) {
            throw new NotFoundException(`Não foi encontrado jogador com o e-mail ${email}`);
        }

        return playerFound;
    }

    async deletePlayer(email: string): Promise<void> {
        const playerFound = this.players.find(player => player.email === email);
        this.players = this.players.filter(player => player.email !== playerFound.email);
    }

    private create(createPlayerDto: CreatePlayerDto): void {
        const { name, cellPhone, email } = createPlayerDto;

        const player: Player = {
            _id: uuidv4(),
            name,
            cellPhone,
            email,
            ranking: 'A',
            rankingPosition: 1,
            urlPlayerPhoto: ''
        }

        this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
        this.players.push(player);
    }

    private update(playerFound: Player, createPlayerDto: CreatePlayerDto): void {
        const { name } = createPlayerDto;
        playerFound.name = name;
    }
}
