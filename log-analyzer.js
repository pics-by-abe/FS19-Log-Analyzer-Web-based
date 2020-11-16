/* Select File -> real to virtual button*/
const realFileBtn = document.getElementById("myfile");
const customBtn = document.getElementById("selLogFilebtn");
const customTxt = document.getElementById("realText");

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

document.getElementById("myfile").addEventListener('change', readFileAsString)
function readFileAsString() 
{
    var files = this.files,
        errorcounter = 0,
        warningcounter = 0;

    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload=function(){ 
        /*document.getElementById('disLogFile')
              .textContent=reader.result; 
        */
        var lines = this.result.split('\r\n');
        console.log(lines.length);
        console.log(lines[0]);
        for (var i = 0; i < lines.length; i++) {
        //console.log(lines[i]);
        //document.getElementById('disLogFile').innerHTML += (lines[line] + "<br>");
            if (lines[i].includes('Error: ')) {
                errorcounter++;
                //document.getElementById("Errorscounter").innerHTML += errorcounter;
            }
            if (lines[i].includes('Warning: ')) {
                console.log('Found warning');
                warningcounter++;
            }
        }
    document.getElementById('Errorscounter').innerHTML = errorcounter;
    document.getElementById('Warningscounter').innerHTML = warningcounter;
    console.log('Gefundene Fehler=' + errorcounter);
    console.log('Gefundene Warning=' + warningcounter);
    }
    reader.readAsText(this.files[0]);

}
