import { model, models, Schema } from 'mongoose';

const auditSchema = new Schema(
  {
    players: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const Audit = models.Audit || model('Audit', auditSchema);
