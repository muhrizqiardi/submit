import "dotenv/config";

const secretKey: string = process.env.SECRET_KEY ?? "";

export default { secretKey };
