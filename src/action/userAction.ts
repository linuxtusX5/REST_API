import { UserModel } from "../models/user.model";

export const getUser = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email})
export const UserBySessionToken = (sessionToken: string) => UserModel.findOne({'authentication.sessionToken': sessionToken});
export const createUser = (value: Record<string, any>) => new UserModel(value).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);