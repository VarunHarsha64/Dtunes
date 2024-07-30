import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
 
    const authHeader = req.headers['Authorisation'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid

        req.id = user; 
        next(); 
    });
};

export const requireArtist = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.isArtist) {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ error: 'Access denied. User is not an artist.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
}
