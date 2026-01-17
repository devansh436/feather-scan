  /*
    middleware:
    - a gate between client & api endpoints
    - acts as a guard, only allows 

    auth.ts:
      1. verify token sent by client (in authheader) with firebase servers
      2. attach idToken to request (req.user) for further use
      3. ensure user exists in DB
  */
  import { Request, Response, NextFunction } from 'express';
  import admin from '../config/firebase';
  import UserModel from '../models/User.models';

  // Create a child class of 'Request' containing additional 'user' prop
  export interface AuthRequest extends Request {
    user?: admin.auth.DecodedIdToken;
  }

  // A function that extracts & attaches 'user' token to HTTP requests
  const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      // S1.VERIFY FIREBASE ID TOKEN 
      // raw firebase id token (jwt string)
      const token = authHeader.split(" ")[1];
      
      // a JSON object w properties like: uid, email, name, etc.
      // it is safe to use bcz server generated, expiry checked
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // S2. ATTACH TOKEN TO HTTP REQUEST 
      req.user = decodedToken;
      
      // S3. ENSURE USER EXISTS IN DB
      const { uid, name, email } = decodedToken;
      const user = await UserModel.findOneAndUpdate(
        { uid },
        { $setOnInsert: { uid, name, email } },
        { upsert: true, new: true },
      );

      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }
  };

  export default authMiddleware;
