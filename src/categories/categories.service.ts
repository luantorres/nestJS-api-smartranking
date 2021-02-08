import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
        private readonly playersService: PlayersService
    ) {};

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { category } = createCategoryDto;

        const categoryFound = await this.categoryModel.findOne({ category }).exec();

        if (categoryFound) {
            throw new BadRequestException(`Categoria '${category}' já cadastrada!`);
        }

        const createdCategory = new this.categoryModel(createCategoryDto);
        return await createdCategory.save();
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryModel.find().populate('players').exec();
    }

    async getCategoryById(category: string): Promise<Category> {
        const categoryFound = await this.categoryModel.findOne({ category }).exec();

        if (!categoryFound) {
            throw new NotFoundException(`Categoria '${category}' não encontrada!`);
        }

        return categoryFound;
    }

    async updateCategory(category: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
        const categoryFound = await this.categoryModel.findOne({ category }).exec();

        if (!categoryFound) {
            throw new NotFoundException(`Categoria '${category}' não encontrada!`);
        }

        await this.categoryModel.findOneAndUpdate({ category }, {$set: updateCategoryDto}).exec();
    }

    async setCategoryPlayer(params: string[]): Promise<void> {
        const category = params['category'];
        const playerId = params['playerId'];

        const categoryFound = await this.categoryModel.findOne({ category }).exec();
        const playerInCategory = await this.categoryModel.findOne({ category }).where('players').in(playerId).exec();

        await this.playersService.getPlayerById(playerId );

        if (!categoryFound) {
            throw new BadRequestException(`Categoria ${category} não encontrada!`);
        }

        if (playerInCategory) {
            throw new BadRequestException(`Jogador ${playerId} já cadastrado na categoria ${category}`);
        }

        categoryFound.players.push(playerId);
        await this.categoryModel.findOneAndUpdate({ category }, { $set: categoryFound });
    }
}
