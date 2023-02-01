export interface IClient {
	id: string;
	name: string;
	secretKey: string;
	count: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IClientCreate {
	name: string
}