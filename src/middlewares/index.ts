import {Request, Response, NextFunction} from 'express';
import { merge, get } from 'lodash';
import { UserBySessionToken } from '../action/userAction';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['SALVATUS-AUTH']
        if(!sessionToken){
        return res.status(400).send({
            success: false,
            message: 'error...'
        })
        }
        const existingUser = await UserBySessionToken(sessionToken);
        if(!existingUser){
        return res.status(401).send({
            success: false,
            message: 'error...'
        })
        }
        merge(req, {identity: existingUser});
        return next();
    } catch (error) {
        console.log(`error in ${error}`);
        return res.status(500).send({
            success: false,
            message: 'error...'
        })
    }
}

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as unknown as string;

        if(!currentUserId){
        return res.status(400).send({
            success: false,
            message: 'error not currect user'
        })
        }
        if(currentUserId.toString() !== id){
        return res.status(401).send({
            success: false,
            message: 'error in user ID'
        })
        }
        next();
    } catch (error) {
        console.log(`error in ${error}`);
        return res.status(500).send({
            success: false,
            message: 'error...'
        })
    }
}