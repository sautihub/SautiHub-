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

document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const artist = document.getElementById("artist").value.trim();
  const song = document.getElementById("song").value.trim();
  const link = document.getElementById("link").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const packageAmount = document.getElementById("package").value;

  if (!artist || !song || !link || !phone) {
    document.getElementById("status").textContent =
      "Please fill in all the required fields.";
    return;
  }

  const message =
    `Hello SautiHub 👋%0A%0A` +
    `I want to promote my music.%0A%0A` +
    `Artist: ${encodeURIComponent(artist)}%0A` +
    `Song: ${encodeURIComponent(song)}%0A` +
    `Music link: ${encodeURIComponent(link)}%0A` +
    `M-Pesa phone: ${encodeURIComponent(phone)}%0A` +
    `Package: KSh ${packageAmount}`;

  const whatsappNumber = "254798346938";

  window.open(
    `https://wa.me/${whatsappNumber}?text=${message}`,
    "_blank"
  );

  document.getElementById("status").textContent =
    "Opening WhatsApp...";
});
