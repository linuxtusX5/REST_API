import {Request, Response} from 'express';
import { deleteUserById, getUser, updateUserById } from '../action/userAction';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUser();
        
        return res.status(200).send({
            success: true,
            message: 'all users',
            users
        })
    } catch (error) {
        console.log(`error in all users ${error}`);
        return res.status(500).send({
            success: false,
            message: 'error while getting all users'
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const deletedUser = await deleteUserById(id);
        return res.status(200).send({
            success: true,
            message: 'deleting successfully',
            deletedUser
        })
    } catch (error) {
        console.log(`error... ${error}`);
        return res.status(500).send({
            success: false,
            message: 'error while deleting users'
        })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {username} = req.body;

        if(!username){
        return res.status(400).send({
            success: true,
            message: 'Something wrong'
        })
        }
        const user = await updateUserById(id, {username});
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }
        user.username = username;
        await user.save();

        return res.status(200).send({
            success: true,
            message: 'User updated successfully',
            user: user // Optionally, you can include the updated user in the response
        });
    } catch (error) {
        console.log(`error... ${error}`);
        return res.status(500).send({
            success: false,
            message: 'error while updating users'
        })
    }
}