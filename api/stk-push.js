const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { phone, amount, reference, description } = req.body;

    if (!phone || !amount || !reference || !description) {
      return res.status(400).json({
        success: false,
        message: "Phone, amount, reference and description are required."
      });
    }

    const normalizedPhone = String(phone)
      .replace(/\s+/g, "")
      .replace(/^0/, "254");

    const body = {
      phone: normalizedPhone,
      amount: Number(amount),
      reference: String(reference),
      description: String(description)
    };

    const timestamp = Math.floor(Date.now() / 1000).toString();

    const signature = crypto
      .createHmac("sha256", process.env.NEPTUNE_SECRET_KEY)
      .update(timestamp + "." + JSON.stringify(body))
      .digest("hex");

    const response = await fetch(
      "https://api.neptunepay.co.ke/api/v1/payments/stk-push",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-public-key": process.env.NEPTUNE_PUBLIC_KEY,
          "x-timestamp": timestamp,
          "x-signature": signature
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to initiate payment."
    });
  }
};
    
