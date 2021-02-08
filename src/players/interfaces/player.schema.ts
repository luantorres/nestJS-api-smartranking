import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    name: { type: String },
    cellPhone: { type: String },
    ranking: String,
    rankingPosition: Number,
    urlPlayerPhoto: String
}, { timestamps: true, collection: 'player' });
