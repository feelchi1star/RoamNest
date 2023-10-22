import { NextRequest, NextResponse } from "next/server";
import MockData from "../.././../src/mockData/products";
function GET(req: Request, res: NextRequest) {
  return NextResponse.json(MockData);
}
export { GET };
