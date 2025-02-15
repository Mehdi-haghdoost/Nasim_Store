import connectToDB from "@/configs/db";


export async function GET() {
    try {
        await connectToDB();
        return Response.json({ message: "Connected to DB successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Failed to connect to DB", error: error.message }, { status: 500 });
    }
}