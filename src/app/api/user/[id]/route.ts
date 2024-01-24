import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } } ) {
    const id = context.params.id
    try {
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return NextResponse.json({ msg: 'Invalid ID provided.' });
        }
        
        if(id) {
            const response = await prisma.user.findUnique({
                where: {
                    UserID: parsedId
                }
            })
            return NextResponse.json(response)
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}