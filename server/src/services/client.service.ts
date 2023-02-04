import { Request } from "express";
import jwt from "jsonwebtoken";
import { v4 } from "uuid"
import { PrismaClient } from "@prisma/client";
import { IClient, IClientCreate, IClientDelete } from "@/interfaces/services/client"

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

    public async create({ name }: IClientCreate): Promise<{ data: IClient | null; error: any }> {
        return this.prisma.clients
            .create({
                data: {
                    name,
                    secretKey: jwt.sign(
                        { name: name, id: v4() },
                        process.env.SECRET_KEY?.toString() || ""
                    )
                }
            })
            .then((createdClient) => {
                return ({ data: createdClient, error: null });
            })
            .catch((err) => {
                return ({ data: null, error: err });
            });
    }

    public async delete({ id }: IClientDelete): Promise<{ data: IClient | null; error: any }> {
        return this.prisma.clients
            .delete({
                where: {
                    id
                }
            })
            .then((deletedClient) => {
                return ({ data: deletedClient, error: null });
            })
            .catch((err) => {
                return ({ data: null, error: err });
            });
    }
}
