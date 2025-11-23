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

router.get("/", async (_req, res) => {
	const categorizedItems: Record<
		string,
		Array<{ name: string; price: number }>
	> = {};

	Object.entries(productInfo).forEach(([name, info]: [string, any]) => {
		const category = info.category || "Other";

		if (!categorizedItems[category]) {
			categorizedItems[category] = [];
		}

		categorizedItems[category].push({
			name,
			price: info.price,
		});
	});

	res.status(200).json({ items: categorizedItems });
});

export { router };
