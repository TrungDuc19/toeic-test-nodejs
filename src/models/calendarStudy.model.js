const mongoose = require('mongoose');
const toJSON = require('../utils/toJSON');

const Schema = mongoose.Schema;

const calendarStudySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        day: {
            type: String,
            required: true,
        },
        cards: [Schema.Types.ObjectId],
    },
    {
        timestamps: true,
    },
);

calendarStudySchema.plugin(toJSON);

const CalendarStudy = mongoose.model('CalendarStudy', calendarStudySchema);

module.exports = CalendarStudy;
