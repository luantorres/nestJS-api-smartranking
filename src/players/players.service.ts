import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { email } = createPlayerDto;

        // const playerFound = this.players.find(player => player.email === email);
        const playerFound = await this.playerModel.findOne({email}).exec();

        if (playerFound) {
            this.update(createPlayerDto);
        } else {
            this.create(createPlayerDto);
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        // return this.players;
        return await this.playerModel.find().exec();
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const playerFound = await this.playerModel.findOne({email}).exec();

        if (!playerFound) {
            throw new NotFoundException(`Não foi encontrado jogador com o e-mail ${email}`);
        }

        return playerFound;
    }

    async deletePlayer(email: string): Promise<any> {
        // const playerFound = this.players.find(player => player.email === email);
        // this.players = this.players.filter(player => player.email !== playerFound.email);
        return await this.playerModel.deleteOne({email}).exec();
    }

    private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        // const { name, cellPhone, email } = createPlayerDto;

        // const player: Player = {
        //     _id: uuidv4(),
        //     name,
        //     cellPhone,
        //     email,
        //     ranking: 'A',
        //     rankingPosition: 1,
        //     urlPlayerPhoto: ''
        // }

        // this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
        // this.players.push(player);

        const createdPlayer = new this.playerModel(createPlayerDto);
        return await createdPlayer.save();
    }

    private async update(createPlayerDto: CreatePlayerDto): Promise<Player> {
        /*
        const { name } = createPlayerDto;
        playerFound.name = name;
        */
        return await this.playerModel.findOneAndUpdate({email: createPlayerDto.email}, {$set: createPlayerDto}).exec();
    }
}
