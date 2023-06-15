import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares';
import { deleteUser, getAllUsers, updateUser } from '../controllers/userData.controller';

export default (router: express.Router) => {
    router.get('/all-users', isAuthenticated, getAllUsers)
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
    router.put('/users/:id', isAuthenticated, isOwner,  updateUser)
}