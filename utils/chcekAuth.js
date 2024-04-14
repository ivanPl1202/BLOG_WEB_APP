import jwt from 'jsonwebtoken';

export default (req, res, next)=>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if(token){
        try{
            const decoded = jwt.verify(token, 'secure123');
            req.userId = decoded._id;
            next();    
        }catch(e){
            return res.status(403).json({
                message: 'Not access'
            });

        }

    }else{
        return res.status(403).json({
            message: 'Not access'
        });
    }
    res.send(token);
}