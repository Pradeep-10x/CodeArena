import {Router} from 'express';
import { registerUser, loginUser,requestPasswordReset,resetPassword ,verifyOtp,resendOtp,refreshToken,isEmailExists, sendOtpEmail } from '../controllers';
import { registerSchema, loginSchema, resetPasswordSchema, validateRequest ,loginOtp,registerOtp} from "../middlewares";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               username: { type: string }
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', validateRequest(registerSchema),registerOtp, registerUser);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', validateRequest(loginSchema), loginUser);

// router.post('/login/otp',loginOtp,sendOtpEmail); //off for now

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *     responses:
 *       200:
 *         description: Reset email sent
 */
router.post("/reset-password", requestPasswordReset);

/**
 * @swagger
 * /api/v1/auth/reset-password/{token}:
 *   patch:
 *     summary: Reset password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
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
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.patch("/reset-password/:token", validateRequest(resetPasswordSchema) ,resetPassword);

// router.post('/verify/login',loginOtp,verifyOtp); //off for now

/**
 * @swagger
 * /api/v1/auth/verify/register:
 *   post:
 *     summary: Verify OTP for registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               otp: { type: string }
 *     responses:
 *       200:
 *         description: OTP verified
 */
router.post('/verify/register',registerOtp,verifyOtp);

/**
 * @swagger
 * /api/v1/auth/resend-otp:
 *   post:
 *     summary: Resend OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               type: { type: string, enum: [registration, login] }
 *     responses:
 *       200:
 *         description: OTP resent
 */
router.post("/resend-otp",resendOtp);

/**
 * @swagger
 * /api/v1/auth/email:
 *   post:
 *     summary: Check if email exists
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *     responses:
 *       200:
 *         description: Check result
 */
router.post("/email",isEmailExists);

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token: { type: string }
 *     responses:
 *       200:
 *         description: New access token generated
 */
router.post("/refresh-token",refreshToken);

export default router;