import { Router } from 'express';
import { changeUsername, deleteAccount, changePassword, getSubmissionById, getSubmissions, updateSkillLevel, logOutOfAllDevices, getLeaderboard, getWinTrend, getRecentMatches, getSubmissionByMatchId, getUserProfile, getProfileHeatmap, getRecentContest, getSubmissionByContestId    } from '../controllers';
import { validateRequest ,changePasswordSchema} from '../middlewares';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/v1/user/skill-level:
 *   patch:
 *     summary: Update skill level
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skillLevel: { type: string }
 *     responses:
 *       200:
 *         description: Skill level updated
 */
router.patch('/skill-level', updateSkillLevel);

/**
 * @swagger
 * /api/v1/user/submissions:
 *   get:
 *     summary: Get all user submissions
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of submissions
 */
router.get('/submissions', getSubmissions);

/**
 * @swagger
 * /api/v1/user/submissions/{id}:
 *   get:
 *     summary: Get a specific submission by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submission details
 */
router.get('/submissions/:id', getSubmissionById);

/**
 * @swagger
 * /api/v1/user/submissions/match/{id}:
 *   get:
 *     summary: Get submissions by match ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match submissions
 */
router.get('/submissions/match/:id', getSubmissionByMatchId);

/**
 * @swagger
 * /api/v1/user/submissions/contest/{id}:
 *   get:
 *     summary: Get submissions by contest ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest submissions
 */
router.get('/submissions/contest/:id', getSubmissionByContestId);


//Setting routes

/**
 * @swagger
 * /api/v1/user/password:
 *   patch:
 *     summary: Change user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword: { type: string }
 *               newPassword: { type: string }
 *     responses:
 *       200:
 *         description: Password changed
 */
router.patch('/password', validateRequest(changePasswordSchema), changePassword);

/**
 * @swagger
 * /api/v1/user/username:
 *   patch:
 *     summary: Change username
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *     responses:
 *       200:
 *         description: Username changed
 */
router.patch('/username', changeUsername);

/**
 * @swagger
 * /api/v1/user:
 *   delete:
 *     summary: Delete user account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted
 */
router.delete('/', deleteAccount);

/**
 * @swagger
 * /api/v1/user/logoutAllDevices:
 *   post:
 *     summary: Log out of all devices
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post('/logoutAllDevices', logOutOfAllDevices);

//Dashboard routes

/**
 * @swagger
 * /api/v1/user/leaderboard:
 *   get:
 *     summary: Get global leaderboard
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leaderboard data
 */
router.get('/leaderboard', getLeaderboard);

/**
 * @swagger
 * /api/v1/user/recent-matches:
 *   get:
 *     summary: Get user's recent matches
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent matches
 */
router.get('/recent-matches', getRecentMatches);

/**
 * @swagger
 * /api/v1/user/win-trend:
 *   get:
 *     summary: Get user win trend
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Win trend data
 */
router.get('/win-trend', getWinTrend);

/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     summary: Get user profile statistics
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Full user profile
 */
router.get('/profile', getUserProfile);

/**
 * @swagger
 * /api/v1/user/profile/heatmap:
 *   get:
 *     summary: Get user activity heatmap
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Heatmap data
 */
router.get('/profile/heatmap', getProfileHeatmap);

/**
 * @swagger
 * /api/v1/user/recent-contest:
 *   get:
 *     summary: Get user's recent contests
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent contests
 */
router.get('/recent-contest', getRecentContest);

export default router;