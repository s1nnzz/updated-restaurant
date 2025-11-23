import { Show, type Component } from "solid-js";

interface Booking {
	booking_id: number;
	booking_dt: string;
	table_number: number;
	people_count: number;
	special_instructions?: string;
}

interface BookingCardProps {
	booking: Booking;
	onDelete: (id: number) => void;
	index?: number;
}

const BookingCard: Component<BookingCardProps> = (props) => {
	const formatDateTime = (datetime: string) => {
		return new Date(datetime).toLocaleString();
	};

	return (
		<div
			class={`booking-glass animate-in stagger-${
				((props.index || 0) % 6) + 1
			}`}
		>
			<div class="booking-details">
				<h3>Reservation #{props.booking.booking_id}</h3>
				<p>
					<strong>Date & Time:</strong>{" "}
					{formatDateTime(props.booking.booking_dt)}
				</p>
				<p>
					<strong>Table:</strong> {props.booking.table_number}
				</p>
				<p>
					<strong>Guests:</strong> {props.booking.people_count}
				</p>
				<Show when={props.booking.special_instructions}>
					<p>
						<strong>Special Requests:</strong>{" "}
						{props.booking.special_instructions}
					</p>
				</Show>
			</div>
			<div class="booking-actions">
				<button
					onClick={() => props.onDelete(props.booking.booking_id)}
					class="btn-danger"
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default BookingCard;
