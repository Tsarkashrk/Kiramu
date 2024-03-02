import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema(
  {
    animeId: {
      type: Number,
      required: true,
    },
    animeName: {
      type: String,
      required: true,
    },
    animeCode: {
      type: String,
      required: true,
    },
    animeImg: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Favorite', FavoriteSchema);
