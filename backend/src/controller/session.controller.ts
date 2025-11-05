import { Request, Response } from "express"
import asyncHandler from "../util/asyncHandler"
import ApiError from "../util/ApiError";
import prisma from "../db/prisma";
import ApiResponse from "../util/ApiResponse";

const createSession = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { problem, difficulty } = req.body;
    const userId = (req as any).user.id
    const clerkId = (req as any).user.clerkId;
  
    if (!problem || !difficulty) {
      throw new ApiError(400, "Problem or Difficulty is not provided")
    }

    //generate unique call id
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const session = await prisma.session.create({
      data: {
        problem,
        difficulty: difficulty.toUpperCase(),
        hostId: userId,
        callId
      }
    })

    // create a video call
    // todo: webrtc and ws connection frontend also needed
    res.status(201).json(
      new ApiResponse(201, session, "Session Created Successfully")
    )
  } catch (error) {
    console.error('Error in CreateSession Controller:', error);
    if (error instanceof ApiError)
      res.status(error?.statusCode as number || 400).json({
        success: error.success,
        message: error.message
      });
  }
})

const getActiveSession = asyncHandler(async (_: Request, res: Response) => {
  try {
    const session = await prisma.session.findMany({
      where: {
        status: "active"
      },
      include: {
        host: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20

    })
    res.status(201).json(
      new ApiResponse(201, session, "Get Active Session")
    )
  } catch (error) {
    console.error('Error in getActiveSession Controller:', error);
    if (error instanceof ApiError)
      res.status(error?.statusCode as number || 400).json({
        success: error.success,
        message: error.message
      });
  }
})

const getMyRecentSession = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const sessions = await prisma.session.findMany({
      where: {
        status: "completed",
        OR: [
          { hostId: userId },
          {
            participants: {
              some: {
                id: userId,
              },
            },
          },
        ],
      },
      include: {
        host: true,
        participants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    res.status(200).json(
      new ApiResponse(200, sessions, "Recent sessions fetched successfully")
    );
  } catch (error) {
    console.error("Error in getMyRecentSession controller:", error);
    if (error instanceof ApiError) {
      res.status(error?.statusCode as number || 400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getSessionById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id: string | undefined = req.params.id;
    if (!id) {
      throw new ApiError(400, "Id is required")
    }

    const session = await prisma.session.findUnique({
      where: {
        id: id
      },
      include: {
        host: true,
        participants: true
      }

    })
    if (!session) {
      throw new ApiError(404, "Session not Found")
    }
    res.status(201).json(
      new ApiResponse(201, session, "Session Found Successfully")
    )
  } catch (error) {
    console.error('Error in getSessionById Controller:', error);
    if (error instanceof ApiError)
      res.status(error?.statusCode as number || 400).json({
        success: error.success,
        message: error.message
      });
  }
})
const joinSession = asyncHandler(async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;
    const userId = (req as any).user.id;

    if (!sessionId) {
      throw new ApiError(400, "Session ID is required");
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { participants: true },
    });

    if (!session) {
      throw new ApiError(404, "Session not found");
    }

    // Example: limit to 2 participants
    if (session.participants.length >= 2) {
      throw new ApiError(400, "Session is full");
    }

    // Prevent duplicate join
    const alreadyJoined = session.participants.some(p => p.id === userId);
    if (alreadyJoined) {
      throw new ApiError(400, "You have already joined this session");
    }

    const data = await prisma.session.update({
      where: { id: sessionId },
      data: {
        participants: {
          connect: { id: userId },
        },
      },


    });

    // todo: sockets
    res.status(200).json(
      new ApiResponse(200, data, "Joined session successfully")
    );


  } catch (error) {
    console.error("Error in joinSession Controller:", error);
    if (error instanceof ApiError) {
      res.status(error.statusCode as number || 400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const endSession = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id: string | undefined = req.params.id
    const userId = (req as any).user._id

    if (!id) {
      throw new ApiError(400, "Id is required")
    }
    const session = await prisma.session.findUnique({
      where: {
        id
      }
    })

    if (!session) {
      throw new ApiError(404, "Session not Found")
    }
    if (session.hostId.toString() != userId.toString()) {
      throw new ApiError(403, "You are not a host")
    }

    if (session.status === "completed") {
      throw new ApiError(400, "Session is already completed")
    }

    const data = await prisma.session.update({
      where: {
        id
      },
      data: {
        status: "completed"
      }
    })
    res.status(201).json(
      new ApiResponse(201, data, "End Session Successfully")
    )
  } catch (error) {
    console.error('Error in endSession Controller:', error);
    if (error instanceof ApiError)
      res.status(error?.statusCode as number || 400).json({
        success: error.success,
        message: error.message
      });
  }
})

export {
  createSession,
  getActiveSession,
  getMyRecentSession,
  getSessionById,
  joinSession,
  endSession
} 