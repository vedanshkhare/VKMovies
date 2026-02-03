const JSON_URL = "https://vedanshkhare.github.io/vk-movies-data/videos.json";

let jsonData = { videos: [] };

// Load existing JSON FIRST
fetch(JSON_URL + "?t=" + Date.now())
  .then(res => res.json())
  .then(data => jsonData = data)
  .catch(() => jsonData = { videos: [] });

const form = document.getElementById("videoForm");
const modal = document.getElementById("jsonModal");
const output = document.getElementById("jsonOutput");

form.addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const yt = document.getElementById("youtube").value.trim();
  const thumb = document.getElementById("thumbnail").value.trim();

  const videoId = extractYouTubeId(yt);
  if (!videoId) return alert("Invalid YouTube link");

  jsonData.videos.push({
    id: "yt_" + Date.now(),
    title,
    videoId,
    thumbnail: thumb || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    visibility: "public",
    addedAt: new Date().toISOString()
  });

  jsonData.lastUpdated = new Date().toISOString();

  // Show updated JSON in modal
  output.value = JSON.stringify(jsonData, null, 2);
  modal.classList.add("show");
});

document.getElementById("copyJson").onclick = () => {
  output.select();
  document.execCommand("copy");
  alert("JSON copied. Paste it into videos.json on GitHub.");
};

document.getElementById("closeModal").onclick = () => {
  modal.classList.remove("show");
};

function extractYouTubeId(url) {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
}
