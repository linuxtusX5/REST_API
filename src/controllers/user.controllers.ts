import {Request, Response} from 'express';
import { getUserByEmail, createUser } from '../action/userAction';
import { authentication, random } from '../helpers';

export const register = async (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body;
        // validation
        if(!username || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'Fill-up'
            })
        }
        // existingUser
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(401).send({
                success: false,
                message: 'account already used'
            })
        }
        const salt = random();
        const user = await createUser({
            username, email,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(200).send({
            success: true,
            message: 'created successfully',
            user
        })
    } catch (error) {
        console.log(`error in regiter ${error}`);
        return res.status(500).send({
            success: false,
            message: 'error while registering'
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: 'Fill-up'
            })
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user){
            return res.status(401).send({
                success: false,
                message: 'user not found'
            })
        }

        const isMatch = user.authentication?.salt && authentication(user.authentication.salt, password);
        if(user.authentication?.password !== isMatch){
            return res.status(403).send({
                success: false,
                message: 'Invalid password'
            })
        }
        const salt = random();
        if(user.authentication){
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        }
        await user.save();
        res.cookie('SALVATUS-AUTH', user.authentication?.sessionToken, {domain: 'localhost', path: '/'});
        return res.status(200).send({
            success: true,
            message: 'login successfully',
            user
        })

    } catch (error) {
        console.log(`error in login ${error}`);
        return res.status(500).send({
            success: false,
            message: 'error while login'
        })
    }
}