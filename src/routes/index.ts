import express from 'express';
import users from './user.routes';
import usersData from './userData.routes';

const router = express.Router();

export default (): express.Router => {
    users(router);
    usersData(router);
    return router;
}