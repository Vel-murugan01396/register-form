
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../util/prisma";


export async function GET(req: NextRequest) {
    const allTasks = await prisma.register.findMany();
    return NextResponse.json(allTasks);
   
}
let currentIdNumber = 1;
function generateCustomId() {
    const paddedNumber = currentIdNumber.toString().padStart(6, '0');
    return `mvk${paddedNumber}`;
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);
    const { firstname,
         lastname,
         email,
         countryCode,
        contact,
        gender,
        dateofbirth,
        Yearofpassing,
        MartialStatus,
        Currentprofession,
        Professiondescription,
        Address,
        Pincode,
        City,
        State,
        Foundestoflifeandschool,
        Suggestion,} = body;

        const customId = generateCustomId();
        currentIdNumber++;

    const savedTask = await prisma.register.create({
        data: { id:customId,
            firstname,
            lastname,
            email,
            countryCode,
            contact,
            gender,
            dateofbirth,
            Yearofpassing,
            MartialStatus,
            Currentprofession,
            Professiondescription,
            Address,
            Pincode,
            City,
            State,
            Foundestoflifeandschool,
            Suggestion,}
        
    });
    return NextResponse.json(savedTask);

    
}




