import clientPromise from "../../lib/mongodb";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Silicone_Dashboard_Database");
    const dasboardData = await db
      .collection("TechGear_Emporium")
      .find({})
      .limit(12)
      .toArray();
    res.json(dasboardData);
  } catch (e) {
    console.error(e);
  }
};
