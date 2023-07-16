const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topicSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        cards: [
            {
                type: Schema.Types.ObjectId,
                ref: 'FlashCard',
            },
        ],
        questionCard: [
            {
                type: Schema.Types.ObjectId,
                ref: 'QuestionCard',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;