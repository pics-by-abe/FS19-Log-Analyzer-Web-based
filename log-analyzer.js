/* Select File -> real to virtual button*/
const realFileBtn = document.getElementById("myfile");
const customBtn = document.getElementById("selLogFilebtn");
const customTxt = document.getElementById("realText");

const fs = require("fs");


customBtn.addEventListener("click", function() {
  realFileBtn.click();


  });

realFileBtn.addEventListener("change", function() {
  if (realFileBtn.value) {
    customTxt.innerHTML = realFileBtn.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
  } else {
    customTxt.innerHTML = "No file chosen, yet.";
  }
});





try {
  // read contents of the file
  const data = fs.readFileSync('file.txt', 'UTF-8');

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  // print all lines
  lines.forEach((line) => {
      console.log(line);
  });
} catch (err) {
  console.error(err);
}
