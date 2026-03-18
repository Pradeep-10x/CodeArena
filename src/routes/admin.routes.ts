import { Router } from 'express';
import { createQuestion } from '../controllers/admin/question.controller';
import { getAllContests, getLeaderboardForContest, getUserDetailsInContest , kickUserFromContest, banUserFromContest} from '../controllers/admin/contest';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrator APIs
 */

/**
 * @swagger
 * /api/v1/admin/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Admin]
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
 *         description: Question created
 */
router.post('/questions', createQuestion);

/**
 * @swagger
 * /api/v1/admin/contests:
 *   get:
 *     summary: Get all contests (admin view)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contests
 */
router.get('/contests', getAllContests);

/**
 * @swagger
 * /api/v1/admin/contests/{contestId}/leaderboard:
 *   get:
 *     summary: Get contest leaderboard
 *     tags: [Admin]
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
router.get('/contests/:contestId/leaderboard', getLeaderboardForContest);

/**
 * @swagger
 * /api/v1/admin/contests/{contestId}/user-details/{participantId}:
 *   get:
 *     summary: Get user details within a contest
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: participantId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 */
router.get('/contests/:contestId/user-details/:participantId', getUserDetailsInContest);

/**
 * @swagger
 * /api/v1/admin/contests/{contestId}/kick/{participantId}:
 *   post:
 *     summary: Kick user from contest
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: participantId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User kicked
 */
router.post('/contests/:contestId/kick/:participantId', kickUserFromContest);

/**
 * @swagger
 * /api/v1/admin/contests/{contestId}/ban/{participantId}:
 *   post:
 *     summary: Ban user from contest
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: participantId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User banned
 */
router.post('/contests/:contestId/ban/:participantId', banUserFromContest);

export default router;