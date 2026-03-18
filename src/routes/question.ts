import {Router} from 'express';
import { getQuestion } from '../controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Question
 *   description: Question APIs
 */

/**
 * @swagger
 * /api/v1/question/{problemId}:
 *   get:
 *     summary: Get a specific question
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: problemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question details
 */
router.get('/:problemId', getQuestion);

export default router;