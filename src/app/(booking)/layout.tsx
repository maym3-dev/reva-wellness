import BookingHeader from "@/components/booking/BookingHeader";
import "@/components/booking/booking.css";

/** Booking engine pages: minimal SHA-style header, no marketing footer. */
export default function BookingLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="bk">
      <BookingHeader />
      <main className="bk-main">{children}</main>
    </div>
  );
}
