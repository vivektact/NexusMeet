import { asyncHandler } from "../utils/async-handler.js"
import { ApiResponse } from "../utils/api-response.js"
import jwt from "jsonwebtoken"
import prisma from "../lib/db.js"

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(404).json(new ApiResponse(401, null, "Unauthorized"))
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET)

  const user = await prisma.User.findUnique({
    where: {
      id: decode.id,
    },
    select: {
      id: true,
      email: true,
      image: true,
      role: true,
      name: true,
    },
  })
  req.user = user
  next()
})

export { authMiddleware }
