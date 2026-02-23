import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/app/_lib/nodemailer"; // make sure this exists

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, guests, date } = body;

    // Basic validation
    if (!name || !email || !guests || !date) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (guests < 1 || guests > 8) {
      return Response.json({ error: "Invalid guest number" }, { status: 400 });
    }

    // Prevent Sunday booking
    const day = new Date(date).getDay();
    if (day === 0) {
      return Response.json(
        { error: "Sundays are not available" },
        { status: 400 },
      );
    }

    // Check current bookings for that date
    const { data: existing, error: fetchError } = await supabase
      .from("cooking-class")
      .select("guests")
      .eq("date", date);

    if (fetchError) {
      return Response.json({ error: fetchError.message }, { status: 500 });
    }

    const totalBooked = existing.reduce(
      (sum, booking) => sum + booking.guests,
      0,
    );
    if (totalBooked + Number(guests) > 8) {
      return Response.json(
        { error: "All seats reserved for this day, try a different date" },
        { status: 400 },
      );
    }

    // Insert booking
    const { data, error: insertError } = await supabase
      .from("cooking-class")
      .insert([{ name, email, guests, date }])
      .select()
      .single();

    if (insertError) {
      return Response.json({ error: insertError.message }, { status: 500 });
    }

    // Send emails
    const bookingDetails = {
      date,
      time: "12:00", // hardcoded start time
      duration: "2h 30m",
      price: "€60",
      guests,
    };

    // Email to client
    await sendEmail(
      email,
      "Cooking Class Booking Confirmed - La Divina Commedia",
      `
      <h3>Dear ${name},</h3>
      <p>Thank you for booking the <strong>Cooking in Paradiso</strong> class at <strong>La Divina Commedia</strong>!</p>
      <h4>Booking Details:</h4>
      <ul>
        <li><strong>Date:</strong> ${bookingDetails.date}</li>
        <li><strong>Time:</strong> ${bookingDetails.time}</li>
        <li><strong>Duration:</strong> ${bookingDetails.duration}</li>
        <li><strong>Guests:</strong> ${bookingDetails.guests}</li>
        <li><strong>Price:</strong> ${bookingDetails.price} per person (to pay at the restaurant)</li>
      </ul>
      <p>We look forward to welcoming you and sharing a wonderful cooking experience!</p>
      <p><strong>The La Divina Commedia Team</strong></p>
      `,
    );

    // Email to owner
    await sendEmail(
      process.env.EMAIL_USER,
      "New Cooking Class Booking",
      `
      <h3>New Cooking Class Booking Received:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Date:</strong> ${bookingDetails.date}</li>
        <li><strong>Time:</strong> ${bookingDetails.time}</li>
        <li><strong>Duration:</strong> ${bookingDetails.duration}</li>
        <li><strong>Guests:</strong> ${bookingDetails.guests}</li>
        <li><strong>Price:</strong> ${bookingDetails.price} per person</li>
      </ul>
      <p>Please prepare for the class accordingly.</p>
      <p><strong>The La Divina Commedia Team</strong></p>
      `,
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Cooking-class booking error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
