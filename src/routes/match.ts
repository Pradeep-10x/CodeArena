import { Router } from 'express';
import { handleSubmitCode, handleRunCode } from '../controllers/submission.controller';
import { io } from '../socket/socket';  // Export io instance

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Match
 *   description: Match execution APIs
 */

/**
 * @swagger
 * /api/v1/match/submit:
 *   post:
 *     summary: Submit code for a match
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code: { type: string }
 *               language: { type: string }
 *               matchId: { type: string }
 *               questionId: { type: string }
 *     responses:
 *       200:
 *         description: Code submitted successfully
 */
router.post('/submit', async (req, res, next) => {
  await handleSubmitCode(req, res, next, io);
});

/**
 * @swagger
 * /api/v1/match/run:
 *   post:
 *     summary: Run code in a match setting
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
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
 *         description: Code run results
 */
router.post('/run', handleRunCode);

export default router;