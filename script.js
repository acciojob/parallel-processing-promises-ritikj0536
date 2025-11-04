const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300",
];

// Function to download a single image (returns a promise)
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image from ${url}`);
  });
}

// Function to download all images in parallel
function downloadImages() {
  loadingDiv.style.display = "block"; // show spinner
  errorDiv.textContent = "";
  output.innerHTML = "";

  const promises = imageUrls.map((url) => downloadImage(url));

  Promise.all(promises)
    .then((images) => {
      loadingDiv.style.display = "none";
      images.forEach((img) => output.appendChild(img));
    })
    .catch((error) => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = error;
    });
}

// Start downloading when the page loads
window.onload = downloadImages;