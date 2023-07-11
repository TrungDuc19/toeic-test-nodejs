const catchAsync = require('../utils/catchAsync');
const { QuestionCard } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const response = require('../utils/response');

const getQuestionCards = catchAsync(async (req, res) => {
    const questionCards = await QuestionCard.find();
    res.status(httpStatus.OK).json(
        response(httpStatus.OK, 'Success', questionCards),
    );
});

const getQuestionCard = catchAsync(async (req, res) => {
    const { questionCardId } = req.params;
    const questionCard = await QuestionCard.findById(questionCardId);
    if (!questionCard) {
        throw new ApiError('QuestionCard not found!', httpStatus.NOT_FOUND);
    }
    res.status(httpStatus.OK).json(
        response(httpStatus.OK, 'Success', questionCard),
    );
});

const createQuestionCard = catchAsync(async (req, res) => {
    const newQuestionCard = req.body;
    const { question, answer } = newQuestionCard;
    if (!question || !answer) {
        throw new ApiError(
            'question or answer is required!',
            httpStatus.BAD_REQUEST,
        );
    }
    const questionCard = await QuestionCard.create(newQuestionCard);
    res.status(httpStatus.CREATED).json(
        response(httpStatus.CREATED, 'Created', questionCard),
    );
});

const updateQuestionCard = catchAsync(async (req, res) => {
    const { questionCardId } = req.params;
    const newQuestionCard = req.body;
    const questionCard = await QuestionCard.findByIdAndUpdate(
        questionCardId,
        newQuestionCard,
    );
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
    res.status(httpStatus.OK).json(response(httpStatus.NO_CONTENT));
});

module.exports = {
    getQuestionCards,
    getQuestionCard,
    createQuestionCard,
    updateQuestionCard,
    deleteQuestionCard,
};