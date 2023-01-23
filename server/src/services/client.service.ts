import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { IClient } from "@/interfaces/services/client"

export default class ClientSerivce {
	protected prisma = new PrismaClient();
	private req: Request;
	
	constructor(req: Request) {
		this.req = req;
	}

	public async get(): Promise<{ data: IClient[] | null; error: any }> {
		    return this.prisma.clients
            .findMany()
            .then((clientList) => {
                return ({ data: clientList, error: null });
            })
            .catch((err) => {
                return ({ data: null, error: err });
            });
	}
}
