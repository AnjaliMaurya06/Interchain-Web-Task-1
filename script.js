const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const imageUpload = document.getElementById("imageUpload");
const topText = document.getElementById("topText");
const bottomText = document.getElementById("bottomText");
const textColor = document.getElementById("textColor");
const textSize = document.getElementById("textSize");
const downloadButton = document.getElementById("downloadMeme");
canvas.width = 400;
canvas.height = 400;
let uploadedImage;
imageUpload.addEventListener("change", (event) => {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      uploadedImage = img;
      drawMeme();
    };
  };
  reader.readAsDataURL(event.target.files[0]);
});

[topText, bottomText, textColor, textSize].forEach((input) => {
  input.addEventListener("input", drawMeme);
});
function drawMeme() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (uploadedImage) {
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
  }
  
  ctx.fillStyle = textColor.value;
  ctx.font = `${textSize.value}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  
  ctx.fillText(topText.value, canvas.width / 2, 10);
  ctx.textBaseline = "bottom";
  ctx.fillText(bottomText.value, canvas.width / 2, canvas.height - 10);
}
downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});