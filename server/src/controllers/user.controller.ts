import User from '../models/User.models';
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';

// Gets user data (name, email, uid)
export const getUserRecord = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const { uid } = user;
  
    const userData = await User.findOne({ uid });
    if (!userData) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
  
    res.status(200).json({ userData });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user records" });
    return;
  }
}
