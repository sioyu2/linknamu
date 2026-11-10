import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const linkIds = links.map((l) => l.id);
const validIds = new Set(linkIds);

// 링크별 클릭 수 조회
export async function GET() {
  try {
    const col = await getClicksCollection();
    if (!col) {
      return NextResponse.json({ error: "MONGODB_URI not configured" }, { status: 503 });
    }
    const docs = await col.find({ _id: { $in: linkIds } }).toArray();
    const counts = Object.fromEntries(docs.map((d) => [d._id, d.count]));
    return NextResponse.json({ counts });
  } catch (err) {
    console.error("[GET /api/click]", err);
    return NextResponse.json({ error: "failed to load counts" }, { status: 500 });
  }
}

// 클릭 1회 기록
export async function POST(req: Request) {
  let id: unknown;
  try {
    ({ id } = await req.json());
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "unknown link id" }, { status: 400 });
  }

  try {
    const col = await getClicksCollection();
    if (!col) {
      return NextResponse.json({ error: "MONGODB_URI not configured" }, { status: 503 });
    }
    await col.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/click]", err);
    return NextResponse.json({ error: "failed to record click" }, { status: 500 });
  }
}
