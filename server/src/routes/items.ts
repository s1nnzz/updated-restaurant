import {
	Router,
	// type Request,
	// type Response,
	// type NextFunction,
} from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productInfoPath = path.join(__dirname, "../productInfo.json");
const productInfo = JSON.parse(
	await fs.readFileSync(productInfoPath).toString()
);

// async function requireAuth(req: Request, res: Response, next: NextFunction) {
// 	if (!req.session || !req.session?.userId) {
// 		res.status(403).json({ message: "Must be logged in for this." });
// 		return;
// 	}

// 	next();
// }

const router = Router();

router.get("/info", async (_req, res) => {
	res.status(200).json({ items: productInfo });
});

export { router };
