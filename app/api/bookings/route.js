import { sendEmail } from "@/app/_lib/nodemailer";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const bookingData = await req.json();
    console.log("📌 Received Booking Data:", bookingData);

    const isLargeBooking = bookingData.guests >= 6;
    const bookingStatus = isLargeBooking ? "pending" : "confirmed"; // Large bookings need approval

    // Remove the 'id' from bookingData to prevent conflicts with Supabase's auto-generated id
    const { id, ...newBookingData } = bookingData;

    // Insert the new booking into the database without specifying the 'id'
    const { data, error } = await supabase
      .from("bookings")
      .insert([{ ...newBookingData, status: bookingStatus }])
      .select()
      .single();

    if (error) throw error;

    const bookingId = data.id;

    if (isLargeBooking) {
      // Send pending confirmation email to customer
      await sendEmail(
        bookingData.email,
        "Booking Pending - La Divina Commedia",
        `
        <h3>Dear ${bookingData.name},</h3>
        <p>Thank you for your booking at <strong>La Divina Commedia</strong>!</p>
        <p>Your reservation is currently <strong>pending</strong> approval. We will notify you once it's confirmed.</p>
        <ul>
          <li><strong>Date:</strong> ${bookingData.date}</li>
          <li><strong>Time:</strong> ${bookingData.time}</li>
          <li><strong>Guests:</strong> ${bookingData.guests}</li>
          <li><strong>Special Request:</strong> ${
            bookingData.special_request || "None"
          }</li>
        </ul>
        <p>Best regards,</p>
        <p><strong>The La Divina Commedia Team</strong></p>
        `
      );

      // Email the restaurant with accept/decline links
      await sendEmail(
        process.env.EMAIL_USER,
        "New Large Booking - Awaiting Confirmation",
        `
        <h3>New Booking Requires Approval:</h3>
        <ul>
          <li><strong>Name:</strong> ${bookingData.name}</li>
          <li><strong>Phone:</strong> ${bookingData.phone}</li>
          <li><strong>Email:</strong> ${bookingData.email}</li>
          <li><strong>Date:</strong> ${bookingData.date}</li>
          <li><strong>Time:</strong> ${bookingData.time}</li>
          <li><strong>Guests:</strong> ${bookingData.guests}</li>
          <li><strong>Special Request:</strong> ${
            bookingData.special_request || "None"
          }</li>
        </ul>

        <p>
          <a href="${
            process.env.SITE_URL
          }/api/update-booking/${bookingId}?status=accepted"
             target="_blank"
             style="padding: 10px 15px; background-color: green; color: white; text-decoration: none;">
             Accept Booking
          </a>
        </p>

        <p>
          <a href="${
            process.env.SITE_URL
          }/api/update-booking/${bookingId}?status=declined"
             target="_blank"
             style="padding: 10px 15px; background-color: red; color: white; text-decoration: none;">
             Decline Booking
          </a>
        </p>

        <p><strong>The La Divina Commedia Team</strong></p>
        `
      );
    } else {
      // Small bookings are automatically confirmed

      await sendEmail(
        process.env.EMAIL_USER, // Send to restaurant owner
        "New Booking Confirmed - La Divina Commedia",
        `
        <h2>📢 New Booking Confirmed!</h2>
        <p>A new booking has been automatically confirmed at <strong>La Divina Commedia</strong>.</p>
        
        <h3>📅 Booking Details:</h3>
        <ul>
          <li><strong>👤 Name:</strong> ${bookingData.name}</li>
          <li><strong>📞 Phone:</strong> ${bookingData.phone}</li>
          <li><strong>✉ Email:</strong> ${bookingData.email}</li>
          <li><strong>📆 Date:</strong> ${bookingData.date}</li>
          <li><strong>⏰ Time:</strong> ${bookingData.time}</li>
          <li><strong>👥 Guests:</strong> ${bookingData.guests}</li>
          <li><strong>📝 Special Request:</strong> ${
            bookingData.special_request || "None"
          }</li>
        </ul>
      
        <p style="margin-top: 20px; font-style: italic; color: #555;">
          This booking was automatically confirmed as it contains less than 6 guests.
        </p>
      
        <p><strong>The La Divina Commedia Team</strong></p>
        `
      );

      await sendEmail(
        bookingData.email,
        "Booking Confirmed - La Divina Commedia",
        `
        <h3>Dear ${bookingData.name},</h3>
        <p>Thank you for your booking at <strong>La Divina Commedia</strong>!</p>
        <p>Your reservation is <strong>confirmed</strong>.</p>
        <ul>
          <li><strong>Date:</strong> ${bookingData.date}</li>
          <li><strong>Time:</strong> ${bookingData.time}</li>
          <li><strong>Guests:</strong> ${bookingData.guests}</li>
          <li><strong>Special Request:</strong> ${
            bookingData.special_request || "None"
          }</li>
        </ul>
        <p>We look forward to welcoming you!</p>
        <p><strong>The La Divina Commedia Team</strong></p>
        `
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Error handling booking:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
