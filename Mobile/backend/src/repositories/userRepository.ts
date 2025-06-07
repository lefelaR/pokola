
import User from '../models/user.model';
import DynamoDatabaseService from "../services/DynamoDatabaseService";
const TableName = process.env.USERS_TABLE;

export const addUser = async (user: User) => {
    user.createdAt = new Date().getTime();
    const params = {
		TableName: TableName,
		Item: {
			...user
		},
	};
    //@ts-ignore
	await DynamoDatabaseService.create(params);
    return user.id;
}

export const createUser = async (user: User) => {
    user.createdAt = new Date().getTime();
    const params = {
		TableName: TableName,
		Item: {
			...user
		},
	};
    //@ts-ignore
	await DynamoDatabaseService.create(params);
    return user.id;
}