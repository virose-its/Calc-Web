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

const button = document.querySelector("button");
button.addEventListener("click", (event) => {
    event.preventDefault();
    // Your Code Here
    const input = document.querySelector("input");
    const output = document.getElementById("data-output");
    const data = input.value;

    output.innerHTML = filterAngle(data);
});