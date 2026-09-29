const releases = [
  {
    artist: "Sparrow B Official",
    song: "Against the World",
    link: "https://youtu.be/BrOLo4fq6F8?si=FYPD74WnjopqBpq9",
    type: "Latest Release"
  },
  {
    artist: "Sparrow B Official",
    song: "Hustle",
    link: "https://youtu.be/2pjDKIEWirg?si=W4BaxnSdF-0_s8aJ",
    type: "Featured"
  },
  {
    artist: "YB G-nazo",
    song: "Never Easy",
    link: "https://youtu.be/arnrBYubLnM?si=Gq-pobvYCKkdc8gL",
    type: "New Release"
  }
];

function displayReleases(list = releases) {
  const container = document.getElementById("releases");

  container.innerHTML = list.map(release => `
    <article class="release-card">
      <div class="release-cover">♪</div>
      <div class="release-info">
        <small>${release.type}</small>
        <h3>${release.song}</h3>
        <p>${release.artist}</p>
        <a href="${release.link}" target="_blank" rel="noopener">
          Listen Now →
        </a>
      </div>
    </article>
  `).join("");
}

displayReleases();

document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();

  const filtered = releases.filter(release =>
    release.artist.toLowerCase().includes(query) ||
    release.song.toLowerCase().includes(query)
  );

  displayReleases(filtered);
});

let selectedPackage = null;

function choose(amount, name) {
  selectedPackage = { amount, name };

  document.getElementById("package").value = amount;

  document.getElementById("status").textContent =
    `${name} package selected — KSh ${amount}`;

  document.getElementById("submit").scrollIntoView({
    behavior: "smooth"
  });
}

document.getElementById("orderForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const status = document.getElementById("status");
  const submitButton = document.getElementById("submit");

  const artist = document.getElementById("artist").value.trim();
  const song = document.getElementById("song").value.trim();
  const link = document.getElementById("link").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const packageAmount = document.getElementById("package").value;

  if (!artist || !song || !link || !phone || !packageAmount) {
    status.textContent =
      "Please fill in all the required fields.";
    return;
  }

  // Convert Kenyan phone number to 254 format
  let formattedPhone = phone.replace(/\s+/g, "");

  if (formattedPhone.startsWith("0")) {
    formattedPhone = "254" + formattedPhone.substring(1);
  }

  if (formattedPhone.startsWith("+254")) {
    formattedPhone = formattedPhone.substring(1);
  }

  if (!/^2547\d{8}$/.test(formattedPhone)) {
    status.textContent =
      "Please enter a valid Kenyan M-Pesa number.";
    return;
  }

  const amount = Number(packageAmount);

  if (!amount || amount < 1) {
    status.textContent =
      "Please select a valid promotion package.";
    return;
  }

  // Prevent double payment requests
  submitButton.disabled = true;
  submitButton.textContent = "Sending STK Push...";

  status.textContent =
    "Sending M-Pesa payment request...";

  try {
    const response = await fetch("/api/stk-push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: formattedPhone,
        amount: amount,
        reference: `SAUTIHUB-${Date.now()}`,
        description: `${artist} - ${song} promotion`
      })
    });

    const data = await response.json();

    console.log("NeptunePay response:", data);

    if (!response.ok) {
      throw new Error(
        data.message ||
        data.error ||
        "Unable to start M-Pesa payment."
      );
    }

    status.textContent =
      "✅ STK Push sent! Check your phone and enter your M-Pesa PIN.";

  } catch (error) {
    console.error("Payment error:", error);

    status.textContent =
      "❌ " + (error.message || "Payment request failed. Please try again.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Pay Now";
  }
});
