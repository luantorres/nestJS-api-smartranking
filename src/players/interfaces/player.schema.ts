import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    cellPhone: { type: String, unique: true },
    email: { type: String, unique: true },
    ranking: String,
    rankingPosition: Number,
    urlPlayerPhoto: String
}, { timestamps: true, collection: 'player' });
