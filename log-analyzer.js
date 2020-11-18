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
        logfileOutput = [],
        logfileOutputString = '',
        errorLines = [],
        errorLinesString = '',
        errorCounter = 0,
        warningCounter = 0,
        luaCallStack = 0,
        luaMethod = 0,
        availableMods = 0,
        loadedMods = 0;

    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload=function(){
        document.getElementById("progess").innerHTML = 'Starting analyse logfile';

        var lines = this.result.split('\r\n');
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].includes('Error: Failed')) {
                errorCounter++;
                //errorLines.push(lines[i+1], '<br>', lines[i], '<br>');
                errorLinesString = errorLinesString + lines[i+1] + '<br>' + lines[i] + '<br>';
            } else if (lines[i].includes('Error: Missing')) {
                errorCounter++;
                //errorLines.push(lines[i-1], '<br>', lines[i], '<br>');
                errorLinesString = errorLinesString + lines[i-1] + '<br>' + lines[i] + '<br>';
            } else if (lines[i].includes('Error: ')){
                errorCounter++
                //errorLines.push(lines[i], '<br>');
                errorLinesString = errorLinesString + lines[i] + '<br>';
            }
            if (lines[i].includes('Warning: ')) {
                warningCounter++;
            }
            if (lines[i].includes('LUA call stack')) {
                luaCallStack++;
            }
            if (lines[i].includes('LUA method ')) {
                luaMethod++;
            }
            if (lines[i].includes('Available mod: ')) {
                availableMods++;
            }
            if (lines[i].includes('Load mod: ')) {
                loadedMods++;
            }
            logfileOutput.push(lines[i] + '<br>');
            logfileOutputString = logfileOutputString + lines[i] + '<br>';

        }
        document.getElementById('Errorscounter').innerHTML = errorCounter;
        document.getElementById('Warningscounter').innerHTML = warningCounter;
        document.getElementById('LuaMethodsCounter').innerHTML = luaCallStack;
        document.getElementById('LuaCallStacksCounter').innerHTML = luaMethod;
        document.getElementById('AvailableModsCounter').innerHTML = availableMods;
        document.getElementById('ActiveModsCounter').innerHTML = loadedMods;

        document.getElementById("progess").innerHTML = 'Finished';
        //document.getElementById('disLogFile').innerHTML = this.result.replace(/\r\n/g, '<br>');
        document.getElementById('errorLines').innerHTML = errorLinesString;
        //document.getElementById('errorLines').innerHTML = errorLines;
        document.getElementById('disLogFile').innerHTML = logfileOutputString;
        //document.getElementById('disLogFile').innerHTML = logfileOutput;
        console.log(errorLines);
    }
    reader.readAsText(this.files[0]);
}
