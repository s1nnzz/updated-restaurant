import { createSignal, onMount, For } from "solid-js";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "@solidjs/router";

interface Item {
	name: string;
	price: number;
}

interface CategorizedItems {
	[category: string]: Item[];
}

function priceReadable(price: number): string {
	const dividedPrice = price / 100;
	const dp = dividedPrice.toFixed(2);
	return `£${dp}`;
}

type AddToCartFunction = (itemName: string) => void;

interface OrderProps {
	addToCart: AddToCartFunction;
}

function Order(props: OrderProps) {
	const [items, setItems] = createSignal<CategorizedItems>({});

	const { authenticated, loading, reload } = useAuth();
	const navigate = useNavigate();

	onMount(() => {
		fetch("/api/items", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((json) => {
				setItems(json.items);
			});
	});

	function checkCanAddToCart(itemName: string) {
		if (!authenticated()) {
			console.log("brah");
			navigate("/login");
			return;
		}
		console.log("hi");

		props.addToCart(itemName);
	}

	return (
		<div class="page-wrapper">
			<div class="container-fluid">
				<div class="text-center spacer-md">
					<h1 class="hero-title">Our Menu</h1>
					<p class="body-text">
						Discover our exquisite selection of culinary delights
					</p>
				</div>

				<div class="menu-showcase">
					<div class="menu-grid">
						<For each={Object.entries(items())}>
							{([category, categoryItems], index) => (
								<div
									class={`category-section animate-in stagger-${
										(index() % 6) + 1
									}`}
								>
									<div class="category-tag">{category}</div>
									<div class="items-flow">
										<For each={categoryItems}>
											{(item) => (
												<div class="item-card">
													<div class="item-header">
														<h3 class="item-name">
															{item.name}
														</h3>
														<div class="item-price">
															{priceReadable(
																item.price
															)}
														</div>
													</div>
													<button
														class="item-action"
														onclick={() =>
															checkCanAddToCart(
																item.name
															)
														}
													>
														Add to Order
													</button>
												</div>
											)}
										</For>
									</div>
								</div>
							)}
						</For>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Order;
