import clientPromise from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  // Await the resolution of the MongoDB client promise
  const client = await clientPromise;
  // Retrieve the DB
  const db = client.db("SPD_Attendence");
  // Parse the JSON body from the request
  const { name, attending, excuse } = await req.json();

  if (attending === "yes") {
    // If attending, insert the name into the "attended" collection
    const result = await db.collection("attended").insertOne({ name });
    return NextResponse.json({ result }, { status: 200 });
  } else {
    // If not attending, insert the name and excuse into the "missed" collection
    const result = await db.collection("missed").insertOne({ name, excuse });
    return NextResponse.json({ result }, { status: 200 });
  }
}
