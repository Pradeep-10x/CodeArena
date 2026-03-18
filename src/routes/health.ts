import { Router } from "express";
const router = Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Check server health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is running successfully
 */
router.get("/", (req, res) => {
    res.json({
        message: "Server is running !!!",
        success: true,
    })
});

export default router;