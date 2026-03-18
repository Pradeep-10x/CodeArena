import { Router } from 'express';

import {
  createContest,
  updateContest,
  deleteContest,
  joinContest,
  getContestDetails,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  updateContestLeaderboard,
  getContestLeaderboard,
  getUserContestRank,
  startContest,
  endContest,
  getContestStatus,
  getAllContestsByCreator,
  getAllQuestions,
  handleRunCode,
  handleSubmitCode,
  addQuestionToContestFromLibrary,
  getSubmissionByQuestionIdAndContestId
} from '../controllers';
import { getRegisteredContests } from '../controllers/contest/allContestByCreator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contest
 *   description: Contest management APIs
 */

/**
 * @swagger
 * /api/v1/contest:
 *   post:
 *     summary: Create a new contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contest'
 *     responses:
 *       201:
 *         description: Contest created
 */
router.post('/', createContest);

/**
 * @swagger
 * /api/v1/contest/addQuestions:
 *   post:
 *     summary: Add question to contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question added
 */
router.post('/addQuestions', createQuestion);

/**
 * @swagger
 * /api/v1/contest/addQuestionsFromLibrary:
 *   post:
 *     summary: Add question from library
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId: { type: string }
 *               contestId: { type: string }
 *     responses:
 *       200:
 *         description: Question added
 */
router.post('/addQuestionsFromLibrary', addQuestionToContestFromLibrary);

/**
 * @swagger
 * /api/v1/contest/updateQuestions:
 *   put:
 *     summary: Update question in contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: Question updated
 */
router.put('/updateQuestions', updateQuestion);

/**
 * @swagger
 * /api/v1/contest/deleteQuestions:
 *   delete:
 *     summary: Delete question from contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId: { type: string }
 *     responses:
 *       200:
 *         description: Question deleted
 */
router.delete('/deleteQuestions', deleteQuestion);

/**
 * @swagger
 * /api/v1/contest/questions/all:
 *   get:
 *     summary: Get all questions
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of questions
 */
router.get('/questions/all', getAllQuestions);

/**
 * @swagger
 * /api/v1/contest/my-contests:
 *   get:
 *     summary: Get user created contests
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contests
 */
router.get('/my-contests' , getAllContestsByCreator)

/**
 * @swagger
 * /api/v1/contest/my-contests/registered:
 *   get:
 *     summary: Get contests user is registered for
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of registered contests
 */
router.get('/my-contests/registered', getRegisteredContests);

/**
 * @swagger
 * /api/v1/contest/{contestId}:
 *   get:
 *     summary: Get contest details
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest details
 */
router.get('/:contestId', getContestDetails);

/**
 * @swagger
 * /api/v1/contest/{contestId}:
 *   put:
 *     summary: Update a contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contest'
 *     responses:
 *       200:
 *         description: Contest updated
 */
router.put('/:contestId', updateContest);

/**
 * @swagger
 * /api/v1/contest/{contestId}:
 *   delete:
 *     summary: Delete a contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest deleted
 */
router.delete('/:contestId', deleteContest);

/**
 * @swagger
 * /api/v1/contest/{contestId}/leaderboard:
 *   post:
 *     summary: Update contest leaderboard
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Leaderboard updated
 */
router.post('/:contestId/leaderboard', updateContestLeaderboard);

/**
 * @swagger
 * /api/v1/contest/{contestId}/leaderboard:
 *   get:
 *     summary: Get contest leaderboard
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Leaderboard data
 */
router.get('/:contestId/leaderboard', getContestLeaderboard);  

/**
 * @swagger
 * /api/v1/contest/{contestId}/rank:
 *   get:
 *     summary: Get user rank in contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User rank
 */
router.get('/:contestId/rank', getUserContestRank);

/**
 * @swagger
 * /api/v1/contest/{contestId}/join:
 *   post:
 *     summary: Join a contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully joined
 */
router.post('/:contestId/join', joinContest);

/**
 * @swagger
 * /api/v1/contest/{contestId}/start:
 *   post:
 *     summary: Start a contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest started
 */
router.post('/:contestId/start', startContest);

/**
 * @swagger
 * /api/v1/contest/{contestId}/end:
 *   post:
 *     summary: End a contest
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest ended
 */
router.post('/:contestId/end', endContest);

/**
 * @swagger
 * /api/v1/contest/{contestId}/status:
 *   get:
 *     summary: Get contest status
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest status
 */
router.get('/:contestId/status', getContestStatus);

/**
 * @swagger
 * /api/v1/contest/{contestId}/questions/{questionId}/run:
 *   post:
 *     summary: Run code against test cases
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code: { type: string }
 *               language: { type: string }
 *               input: { type: string }
 *     responses:
 *       200:
 *         description: Execution results
 */
router.post('/:contestId/questions/:questionId/run', handleRunCode);

/**
 * @swagger
 * /api/v1/contest/{contestId}/questions/{questionId}/submit:
 *   post:
 *     summary: Submit code for evaluation
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code: { type: string }
 *               language: { type: string }
 *     responses:
 *       200:
 *         description: Submission queued
 */
router.post('/:contestId/questions/:questionId/submit', handleSubmitCode);

/**
 * @swagger
 * /api/v1/contest/{contestId}/questions/{questionId}/submissions:
 *   get:
 *     summary: Get submissions for a question
 *     tags: [Contest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of submissions
 */
router.get('/:contestId/questions/:questionId/submissions', getSubmissionByQuestionIdAndContestId);

export default router;
