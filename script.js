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
    .filter((frame) => frame.length > 40)
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

let datacoba = `Keyframes
Motion2+Step|<step frame="77" pose="-0.88 0 0 -39.84 32.52 -14.65 18.16 36.91 -37.21 -32.81 30.47 -132.42 134.18 66.21 -65.62" />

Motion2+Step|<step frame="153" pose="0 0 0 -31.75 31.65 -63.52 67.04 -66.03 63.13 -49.88 50.71 -18.49 18.51 47.99 -47.98" />

Motion2+Step|<step frame="154" pose="0 0 0 -31.64 31.64 -64.16 67.68 -67.38 64.45 -50.1 50.98 -16.99 16.99 47.75 -47.75" />

Motion2+Step|<step frame="230" pose="0 0 0 1.76 -1.76 -85 85 -80.86 80.86 -51.27 51.27 -17.29 17.29 46.58 -46.58" />

Motion2+Step|<step frame="245" pose="0 0 0 1.76 -1.76 -84 84 -81.45 81.45 -46.58 46.58 -18.46 18.46 18.46 -18.46" />

Motion2+Step|<step frame="282" pose="0 0 0 1.46 -1.46 -81 81 -82.91 82.91 -35.45 35.45 -21.09 21.09 -51.27 51.27" />

Motion2+Step|<step frame="334" pose="0 0 0 2.34 -2.34 -72.07 72.07 -82.32 82.32 -34.86 34.86 -20.51 20.51 -51.27 51.27" />

Motion2+Step|<step frame="410" pose="-0.88 0 0 3.81 -3.81 -29 29 -81.45 81.45 -33.98 33.98 -19.92 19.92 -51.27 51.27" />

`;

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