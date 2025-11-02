import 'dotenv/config';
import asyncHandler from '../util/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { requireAuth } from '@clerk/express';
import ApiError from '../util/ApiError';
import prisma from '../db/prisma';

export const protectRoute = [
    requireAuth({signInUrl: "/sign-in"}),
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clerkId = (req as any).auth()?.userId;

            if (!clerkId) {
                throw new ApiError(401, "Unauthorized - Invalid Token")
            }

            const user = await prisma.user.findUnique({
                where: {
                    clerkId
                }
            })

            if (!user) {
                throw new ApiError(404, "User not Found")
            }

            (req as any).user = user
            next()
        } catch (error) {
            console.error('Error in protectRoute middleware:', error);
            if (error instanceof ApiError)
                res.status(error?.statusCode as number || 400).json({
                    success: error.success,
                    message: error.message
                });
        }
    }),
];
