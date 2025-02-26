import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/app/_lib/nodemailer";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req, { params }) {
  try {
    const { id } = await params; // Directly access params
    const { searchParams } = new URL(req.url);
    const newStatus = searchParams.get("status");

    // Validate the status
    if (!["accepted", "declined"].includes(newStatus)) {
      return new Response(JSON.stringify({ error: "Invalid status" }), {
        status: 400,
      });
    }

    console.log(`Updating booking ${id} to status: ${newStatus}`);

    // Fetch the booking first to ensure it exists
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single(); // Use .single() for one row

    if (fetchError || !booking) {
      console.error("Error fetching booking or booking not found:", fetchError);
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
      });
    }

    // Update the status in the database
    const { data, error: updateError } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);

    if (updateError) {
      console.error("Error updating status:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update booking status" }),
        { status: 500 }
      );
    }

    // Fetch updated booking data after the update
    const { data: updatedBooking, error: selectError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (selectError || !updatedBooking) {
      console.error("Error fetching updated booking data:", selectError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch updated booking data" }),
        { status: 500 }
      );
    }

    // Ensure email exists before sending
    if (!updatedBooking?.email) {
      console.error("No email found for booking:", updatedBooking);
      return new Response(JSON.stringify({ error: "Email field is missing" }), {
        status: 500,
      });
    }

    // Send confirmation email to the customer
    await sendEmail(
      updatedBooking.email,
      `Booking ${
        newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
      } - La Divina Commedia`,
      `
      <h3>Dear ${updatedBooking.name},</h3>
      <p>Your booking at <strong>La Divina Commedia</strong> has been <strong>${newStatus}</strong>.</p>
      <ul>
        <li><strong>Date:</strong> ${updatedBooking.date}</li>
        <li><strong>Time:</strong> ${updatedBooking.time}</li>
        <li><strong>Guests:</strong> ${updatedBooking.guests}</li>
        <li><strong>Special Request:</strong> ${
          updatedBooking.special_request || "None"
        }</li>
      </ul>
      <p>${
        newStatus === "accepted"
          ? "We look forward to seeing you!"
          : "We apologize for the inconvenience and hope to see you another time."
      }</p>
      <p><strong>The La Divina Commedia Team</strong></p>
      `
    );

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: `The booking has been successfully updated to '${
          newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
        }'.`,
        status: newStatus,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("❌ Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
