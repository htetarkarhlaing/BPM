import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

const prisma = new PrismaClient();

const clientData: Prisma.ClientsCreateManyInput[] = [
	{
		name: "development",
		secretKey: jwt.sign(
			{ name: "development", id: v4() },
			process.env.SECRET_KEY?.toString() || ""
		),
		count: 0,
	},
	{
		name: "production",
		secretKey: jwt.sign(
			{ name: "production", id: v4() },
			process.env.SECRET_KEY?.toString() || ""
		),
		count: 0,
	},
];

async function main() {
	console.log(`Start seeding ...`);
	//role seeding
	for (const client of clientData) {
		const clientSeededData = await prisma.clients.create({
			data: client,
		});
		console.log(`Created client with id: ${clientSeededData.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
