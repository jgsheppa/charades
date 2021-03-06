import { devMethods } from "../db/methods";

const isProduction = process.env.NODE_ENV === "production";

// get all parties
const getAllParties = async (req, res) => {
  if (isProduction) {
    return res.status(400).send("ACCESS DENIED: dev only method");
  }

  const parties = await devMethods.getAllParties();
  res.status(200).send(parties);
};

// clear all parties
const clearAllParties = async (req, res) => {
  if (isProduction) {
    return res.status(400).send("ACCESS DENIED: dev only method");
  }

  await devMethods.clearParties();
  res.status(200).send("clearAllParties success");
};

export default { getAllParties, clearAllParties };
