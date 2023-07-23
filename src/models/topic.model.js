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
        onModel: {
            type: String,
            required: true,
            enum: ['FlashCard', 'QuestionCard'],
        },
        cards: [
            {
                type: Schema.Types.ObjectId,
                refPath: 'onModel',
            },
        ],
        orderIndex: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
);

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
