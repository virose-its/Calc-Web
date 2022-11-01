function filterAngle(angle) {
  let frame = angle.split('frame="');
  let frame2 = frame
    .filter((frame) => frame.length > 40)
    .map((frame) => {
      let timestamp = "";
      for (let i = 0; i < frame.length; i++) {
        if (frame[i] === '"') {
          break;
        } else {
          timestamp += frame[i];
        }
      }
      return Math.round(Number(timestamp) * 7.81);
    });

  let contoh = angle.split("pose=");
  let contoh2 = contoh
    .filter((frame) => frame.length > 45)
    .map((frame) => frame.split("/>")[0])
    .map((frame) => frame.slice(1, frame.length - 2));
  contoh3 = contoh2.map((frame, index) => {
    let a = frame.split(" ");
    a = a.map((angka) => Math.round((parseFloat(angka) + 150) / 0.293));
    a.push(frame2[index]);

    return a;
    // contoh3.push(a);
  });

  // let contoh3 = String(contoh2.map(frame => frame.split(' ').map( angka => Math.round((parseFloat(angka)+150) / 0.293))));
  // let data_angle = contoh3.split(',').map(frame => Number(frame));

  let stringContoh = `{\n\t${contoh3
    .map((frame) => `{${frame}}`)
    .join(`,\n\t`)}\n}`;
  return stringContoh;
}

// let datacoba = `
// Keyframes
// Motion2+Step|<step frame="128" pose="-1.46 -13.48 25.2 -96.39 0 -43.36 35.16 1.76 79.1 -41.31 41.89 5.27 -5.27 53.61 58.89" />

// Motion2+Step|<step frame="153" pose="-1.46 -13.48 33.69 -96.39 0 -43.36 35.16 1.76 79.1 -60.94 41.89 4.98 -5.27 -60.64 58.89" />

// Motion2+Step|<step frame="231" pose="-1.46 1.46 62.99 0 0 -35.16 35.16 -79.1 79.1 -41.89 41.89 5.27 -5.27 -58.89 58.89" />

// Motion2+Step|<step frame="282" pose="0 0 0 0 0 -35.16 35.16 -79.1 79.1 -41.89 41.89 5.27 -5.27 -58.89 58.89" />

// Motion2+Step|<step frame="359" pose="-1.46 13.48 -25.2 0 96.39 -35.16 43.36 -79.1 -1.76 -41.89 41.31 5.27 -5.27 -58.89 -53.61" />

// Motion2+Step|<step frame="385" pose="-1.46 13.48 -33.69 0 96.39 -35.16 43.36 -79.1 -1.76 -41.89 60.94 5.27 -4.98 -58.89 60.64" />

// Motion2+Step|<step frame="462" pose="-1.46 -1.46 -62.99 0 0 -35.16 35.16 -79.1 79.1 -41.89 41.89 5.27 -5.27 -58.89 58.89" />

// `;

// console.log(filterAngle(datacoba));



const button_XL = document.querySelector("#button_XL");
const button_MX = document.querySelector("#button_MX");
const clipboard = document.querySelector("div.tooltip");
const output = document.querySelector("div.textarea");
const button = document.querySelector("button");

button.addEventListener("click", (event) => {
    event.preventDefault();
    // Your Code Here
    const input = document.querySelector("input");
    const data = input.value;

    output.classList.add("text-sky-500");
    output.classList.remove("text-[#575E6D]");
    output.innerHTML = filterAngle(data);
});

button_MX.addEventListener("click", (event) => {
  event.preventDefault();

  button_MX.classList.remove("text-[#687A9E]");
  button_MX.classList.add("bg-[#BDA7E9]", "text-[#2B2D50]");
  button_XL.classList.remove("bg-[#BDA7E9]", "text-[#2B2D50]");
  button_XL.classList.add("text-[#687A9E]");
});

button_XL.addEventListener("click", (event) => {
  event.preventDefault();

  button_XL.classList.remove("text-[#687A9E]");
  button_XL.classList.add("bg-[#BDA7E9]", "text-[#2B2D50]");
  button_MX.classList.remove("bg-[#BDA7E9]", "text-[#2B2D50]");
  button_MX.classList.add("text-[#687A9E]");
});

clipboard.addEventListener("click", (event) => {
  event.preventDefault();

  const textArea = document.querySelector("div.textarea").innerHTML;
  navigator.clipboard.writeText(textArea);
  console.log(textArea);

  const tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied!";
});

clipboard.addEventListener("mouseout", (event) => {
  const tooltip = document.querySelector("span.tooltiptext");
  tooltip.innerHTML = "Copy to clipboard";
});

output.innerHTML = `{
    {507,466,598,183,512,364,632,518,782,371,655,530,494,695,713,1000},
    {507,466,627,183,512,364,632,518,782,304,655,529,494,305,713,1195},
    {507,517,727,512,512,392,632,242,782,369,655,530,494,311,713,1804},
    {512,512,512,512,512,392,632,242,782,369,655,530,494,311,713,2202},
    {507,558,426,512,841,392,660,242,506,369,653,530,494,311,329,2804},
    {507,558,397,512,841,392,660,242,506,369,720,530,495,311,719,3007},
    {507,507,297,512,512,392,632,242,782,369,655,530,494,311,713,3608}
}`;
