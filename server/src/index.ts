import express from "express";
import chalk from "chalk";
import session from "express-session";
import cors from "cors";

const app = express();

// routers

import {
	authRouter,
	bookingRouter,
	passwordRouter,
	userRouter,
	paymentRouter,
	itemsRouter,
} from "./routes";
import { initializeDatabase } from "./database";

// app constants

const PORT_NUMBER = 5000;

// middleware

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "supersupersecret",
		saveUninitialized: false,
		resave: true,
		cookie: {
			secure: false,
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		},
	})
);

// routes

app.use("/auth", authRouter);
app.use("/booking", bookingRouter);
app.use("/password", passwordRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/items", itemsRouter);

// start app

(async () => {
	try {
		await initializeDatabase();
		app.listen(PORT_NUMBER, () => {
			console.log(
				chalk.bgBlueBright(`Server listening on port ${PORT_NUMBER}!`)
			);
		});
	} catch (err) {
		console.error("Failed to initialize database:", err);
		process.exit(1);
	}
})();
