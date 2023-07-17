const catchAsync = require('../utils/catchAsync');
const { QuestionCard, Topic } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const response = require('../utils/response');

const getQuestionCards = catchAsync(async (req, res) => {
    const questionCards = await QuestionCard.find()
        .populate({
            path: 'topic',
            select: 'name -_id',
        })
        .populate({
            path: 'course',
            select: 'name -_id',
        });
    res.status(httpStatus.OK).json(
        response(httpStatus.OK, 'Success', questionCards),
    );
});

const getQuestionCard = catchAsync(async (req, res) => {
    const { questionCardId } = req.params;

    const questionCard = await QuestionCard.findById(questionCardId)
        .populate({
            path: 'topic',
            select: 'name -_id',
        })
        .populate({
            path: 'course',
            select: 'name -_id',
        });
    if (!questionCard) {
        throw new ApiError('QuestionCard not found!', httpStatus.NOT_FOUND);
    }

    res.status(httpStatus.OK).json(
        response(httpStatus.OK, 'Success', questionCard),
    );
});

const createQuestionCard = catchAsync(async (req, res) => {
    const newQuestionCard = req.body;
    const { question, answer, topicName } = newQuestionCard;

    if (!question || !answer || !topicName) {
        throw new ApiError(
            'question, answer or topic name is required!',
            httpStatus.BAD_REQUEST,
        );
    }

    const topic = await Topic.findOne({ name: topicName });

    if (!topic) {
        throw new ApiError('Topic not found!', httpStatus.NOT_FOUND);
    }

    delete newQuestionCard.topicName;

    const questionCard = await QuestionCard.create({
        ...newQuestionCard,
        topic: topic._id,
        course: topic.course,
    });

    topic.questionCard.push(questionCard._id);
    await topic.save();

    res.status(httpStatus.CREATED).json(
        response(httpStatus.CREATED, 'Created', questionCard),
    );
});

const updateQuestionCard = catchAsync(async (req, res) => {
    const { questionCardId } = req.params;
    const newQuestionCard = req.body;
    const { topicName } = newQuestionCard;

    const topic = await Topic.findOne({ name: topicName });
    if (!topic) {
        throw new ApiError('Topic not found!', httpStatus.NOT_FOUND);
    }

    const questionCard = await QuestionCard.findByIdAndUpdate(questionCardId, {
        ...newQuestionCard,
        topic: topic._id,
        course: topic.course,
    });

    if (!questionCard) {
        throw new ApiError('QuestionCard not found', httpStatus.NOT_FOUND);
    }

    res.status(httpStatus.OK).json(
        response(httpStatus.OK, 'Updated', questionCard),
    );
});

const deleteQuestionCard = catchAsync(async (req, res) => {
    const { questionCardId } = req.params;
    const questionCard = await QuestionCard.findByIdAndDelete(questionCardId);

    if (!questionCard) {
        throw new ApiError('QuestionCard not found', httpStatus.NOT_FOUND);
    }

    await Topic.findByIdAndUpdate(questionCard.topic, {
        $pull: {
            questionCard: questionCardId,
        },
    });

    res.status(httpStatus.OK).json(response(httpStatus.NO_CONTENT));
});

module.exports = {
    getQuestionCards,
    getQuestionCard,
    createQuestionCard,
    updateQuestionCard,
    deleteQuestionCard,
};
