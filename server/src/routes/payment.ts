import {
	Router,
	type Request,
	type Response,
	type NextFunction,
} from "express";
import { type Product } from "../types";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productInfoPath = path.join(__dirname, "../productInfo.json");
const productInfo = JSON.parse(
	await fs.readFileSync(productInfoPath).toString()
);

import StripeLoader from "stripe";

const stripe = new StripeLoader(process.env.STRIPE_SECRET!);

async function requireAuth(req: Request, res: Response, next: NextFunction) {
	if (!req.session || !req.session?.userId) {
		res.status(403).json({ message: "Must be logged in for this." });
		return;
	}

	next();
}

const router = Router();

router.post("/create-payment-session", requireAuth, async (req, res) => {
	const products: Product[] = req.body.products;

	console.log(products);

	if (!Array.isArray(products) || products.length === 0) {
		res.status(400).json({ message: "No products provided" });
		return;
	}

	const line_items = products
		.map((product: Product) => {
			const info = productInfo[product.name];

			if (!info) {
				return null;
			}

			return {
				price_data: {
					currency: "gbp",
					product_data: {
						name: product.name,
						images: [product.image],
					},
					unit_amount: info.price,
				},
				quantity: product.quantity,
			};
		})
		.filter((item) => item !== null);

	const session = await stripe.checkout.sessions.create({
		line_items,
		payment_method_types: ["card"],
		mode: "payment",
		success_url: "http://localhost:3000/booking?success=true",
		cancel_url: "http://localhost:3000/booking?canceled=true",
	});

	res.json({ id: session.id, url: session.url });
});

export { router };
