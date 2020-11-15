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
    var files = this.files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload=function(){ 
      /*document.getElementById('disLogFile') 
              .textContent=reader.result; 
      */



      var lines = this.result.split('\n');
      for(var line = 0; line < lines.length; line++)
      {
        console.log(lines[line]);
        document.getElementById('disLogFile').innerHTML += (lines[line] + "<br>");

        if (lines[line].includes("Error: "))
        {
          var errorcounter = 0;
          errorcounter + 1;
          document.getElementById("Errorscounter").innerHTML += errorcounter;
        }

      } 

     
              


    } 

    reader.readAsText(this.files[0]);

}
