
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../util/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = "your-secret-key";

export async function GET(req: NextRequest) {
    const allTasks = await prisma.login.findMany();
    return NextResponse.json(allTasks);
   
}




export async function POST(req: NextRequest) {
    const body = await req.json();

    const { name,password} = body;

  


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const savedTask = await prisma.login.create({
        data: {
            name,
            password:hashedPassword
        }
    });
    const token = jwt.sign({ userId: savedTask.id }, secretKey, {
        expiresIn: "1h",
    });
    return NextResponse.json({ token, savedTask });
}




