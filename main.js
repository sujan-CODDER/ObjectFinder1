objects = []
status = ""
function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status:Detecting Objects"
    object_name = document.getElementById("input_id").value
}

function preload() {

}
function setup() {
    canvas = createCanvas(500, 300)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}
function draw() {
    image(video, 0, 0, 500, 300)
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000"); percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill(); stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_found").innerHTML = object_name + " Found";
                synth = window.speechSynthesis; utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("object_found").innerHTML = object_name + " not found"
            }
        }
    }
}
function modelLoaded() {
    status = true
}
function gotResult(error,results)
{
    if (error) {
     console.error(error);   
    }
    objects=results
}




