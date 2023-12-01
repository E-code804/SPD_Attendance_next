import clientPromise from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const client = await clientPromise;
  const db = client.db("SPD_Attendence");
  const { name, attending, excuse } = await req.json();
  // console.log(name);
  if (attending === "yes") {
    const result = await db.collection("attended").insertOne({ name });
    return NextResponse.json({ result }, { status: 200 });
  } else {
    const result = await db.collection("missed").insertOne({ name, excuse });
    return NextResponse.json({ result }, { status: 200 });
  }
}
