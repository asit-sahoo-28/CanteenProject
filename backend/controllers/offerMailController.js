import userModel from "../models/userModel.js";
import { sendEmail } from "../services/emailService.js";

// ================================
// SEND OFFER MAIL TO ALL USERS
// ================================

export const generateOfferMessage = async (req, res) => {
  try {
    const { subject, title } = req.body;

const messages = [
  `🎉 ${title}! This is your perfect chance to enjoy something truly delicious at an unbeatable price. We’ve crafted this special offer just for you, combining amazing taste with incredible savings. Don’t wait too long—these deals are available for a limited time only. Order now and treat yourself today!`,

  `🔥 ${subject}: ${title}! Craving something tasty? Now is the best time to satisfy your hunger with our exclusive offer. Enjoy premium quality food at prices that make you smile. Hurry up, because this deal won’t last forever. Grab your favorite dishes and experience the joy of great food at a great price!`,

  `✨ ${title}! Indulge in a delightful experience filled with rich flavors and irresistible aroma. This special offer brings you the perfect combination of quality and affordability. Whether you're relaxing at home or sharing with friends, this is your moment to enjoy something extraordinary. Order now before the offer disappears!`,

  `💥 Special Offer Alert! ${title}. Don’t miss out on this amazing opportunity to enjoy mouth-watering meals at a price that feels too good to be true. We’ve designed this deal to give you maximum satisfaction at minimum cost. Act fast, because once it’s gone, it’s gone!`,

  `🥳 ${title}! Make your day more exciting with our exclusive deal that brings together taste, quality, and affordability. This is not just food, it’s an experience you’ll love from the first bite. Order now and enjoy something truly special while saving money at the same time!`,

  `🍽️ ${title}! Freshly prepared, full of flavor, and now available at a discounted price just for you. This is your chance to enjoy premium quality food without worrying about the cost. Treat yourself and your loved ones today—because great food should always come with great value!`,

  `🚀 ${subject}! ${title} is here to make your day better than ever. Enjoy delicious meals that satisfy your cravings while saving money. This limited-time offer is your chance to experience something amazing without spending too much. Don’t delay—place your order right now!`,

  `💫 ${title}! Experience the magic of perfectly prepared food combined with exciting savings. Every bite is designed to give you maximum satisfaction and happiness. Don’t miss this limited-time opportunity to enjoy something special at a price you’ll absolutely love!`,

  `🍔 ${title}! Your favorite meals are now even more enjoyable with this amazing discount offer. Take advantage of this opportunity to indulge in your cravings without any guilt. Hurry up and place your order now before this deal disappears!`,

  `🎯 ${subject}: ${title}! This is the perfect time to enjoy your favorite dishes while saving big. We’ve created this offer to give you maximum value and satisfaction. Don’t wait—these deals are limited and highly popular. Order now and make the most of it!`,

  `🌟 ${title}! Treat yourself to something special with our exclusive offer designed just for you. Enjoy premium quality meals at a fraction of the cost. This is your moment to enjoy great taste, amazing value, and unforgettable satisfaction—all in one order!`,

  `🥗 ${title}! Healthy, delicious, and now more affordable than ever. This offer is perfect for those who love great food without compromising on quality or budget. Order today and enjoy a fresh, flavorful experience that makes every bite worth it!`,

  `🔥 Hot Deal Alert! ${title}. This is your chance to enjoy irresistible flavors at a price that won’t last long. Take advantage of this limited-time offer and treat yourself to something amazing. Hurry before this deal is gone forever!`,

  `🎁 ${title}! A special treat created just for you. Enjoy delicious food with an exciting discount that makes every bite even more satisfying. Don’t miss out on this opportunity to indulge yourself without spending too much. Order now!`,

  `💸 ${title}! Save big while enjoying your favorite meals with this exclusive offer. This is the perfect opportunity to satisfy your cravings and keep your wallet happy. Don’t miss out—grab this deal before it’s gone!`,

  `😋 ${title}! Delicious food meets amazing savings in this incredible offer. Treat yourself to something special and enjoy every bite without worrying about the price. This deal is available for a limited time—order now!`,

  `⏳ ${subject}! ${title} is ending soon. Don’t miss this opportunity to enjoy incredible food at discounted prices. Time is running out, so act fast and place your order now before it’s too late!`,

  `🍕 ${title}! Your favorite dishes are now available with exciting offers that you simply can’t ignore. Enjoy rich flavors, fresh ingredients, and unbeatable prices all in one place. Order now and make your day delicious!`,

  `🎊 ${title}! Make your day extra special with our exclusive deal. Enjoy delicious meals that bring happiness with every bite. This limited-time offer is your chance to experience something truly amazing at a great price!`,

  `⚡ ${title}! Quick, tasty, and affordable—this is the perfect combo you’ve been waiting for. Don’t miss out on this exciting offer that brings you great food at an incredible price. Order now and enjoy instantly!`,
];

    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)];

    res.json({
      success: true,
      data: randomMessage,
    });

  } catch (error) {
    res.json({
      success: false,
      message: "AI failed",
    });
  }
};





export const sendOfferMailToAllUsers = async (req, res) => {
  try {
    const { subject, title, messageBody, couponCode, expiryDate } = req.body;

    if (!subject || !messageBody) {
      return res.json({
        success: false,
        message: "Subject and message are required",
      });
    }

    // Get all registered users
    const users = await userModel.find({}, "email name");

    if (!users.length) {
      return res.json({
        success: false,
        message: "No users found",
      });
    }

    // =====================
    // Dynamic Email Template
    // =====================
    const createEmailTemplate = (userName) => `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
        <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:12px;">
          
          <h2 style="color:#27ae60; text-align:center;">
            ${title || "Special Offer For You 🎉"}
          </h2>

          <p>Dear <strong>${userName}</strong>,</p>

          <p style="font-size:15px; line-height:1.6;">
            ${messageBody}
          </p>

          ${
            couponCode
              ? `
              <div style="margin:25px 0; text-align:center;">
                <span style="
                  background:#27ae60;
                  color:white;
                  padding:12px 25px;
                  border-radius:8px;
                  font-size:20px;
                  letter-spacing:2px;
                ">
                  ${couponCode}
                </span>
              </div>
            `
              : ""
          }

          ${
            expiryDate
              ? `<p style="color:#e74c3c;"><b>Valid Till:</b> ${expiryDate}</p>`
              : ""
          }

          <hr style="margin:30px 0;" />

          <p style="text-align:center; color:#777;">
            Thank you for being with us ❤️
          </p>

          <p style="text-align:center;">
            <b>${process.env.CANTEEN_NAME || "Canteen Team"}</b>
          </p>

        </div>
      </div>
    `;

    // =====================
    // Send Mail To All Users
    // =====================
    let successCount = 0;

    for (const user of users) {
      try {
        const emailHTML = createEmailTemplate(user.name || "Customer");

        await sendEmail({
          to: user.email,
          subject,
          message: emailHTML,
        });

        successCount++;
      } catch (err) {
        console.log("Failed for:", user.email);
      }
    }

    res.json({
      success: true,
      message: `Offer email sent to ${successCount} users`,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Failed to send offer emails",
    });
  }
};
