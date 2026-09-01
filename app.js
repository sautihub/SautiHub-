const releases = [
  {
    artist: "Sparrow B",
    song: "Four Twenty",
    link: "https://youtube.com/",
    type: "Latest Release"
  },
  {
    artist: "SautiHub Artist",
    song: "New Sound",
    link: "https://youtube.com/",
    type: "Featured"
  },
  {
    artist: "Upcoming Artist",
    song: "Coming Soon",
    link: "https://youtube.com/",
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
});let selectedPackage = null;

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
