
class teachable_function{
    $teachable_function = null;
    constructor($target){
        var $teachable_function = document.createElement("script");
        $teachable_function.type = "text/javascript";
        $teachable_function.innerHTML = `
        // More API functions here:
        // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose
        //목운동2가지 https://teachablemachine.withgoogle.com/models/q77H_KVus/
        //손 위로 번쩍 https://teachablemachine.withgoogle.com/models/g9RBx3WyR/
        // the link to your model provided by Teachable Machine export panel
        const URL = "https://teachablemachine.withgoogle.com/models/g9RBx3WyR/";
        let model, webcam, ctx, labelContainer, maxPredictions, webcam_status = false;
        var audio2 = new Audio('/sound/dingdong.mp3');
        var sound_check = false;
        var count = 0;
        var status = "nomal";
        var score = [];
        var ready_tf = false;
        var score_on = false;
        `;
        this.$teachable_function = $teachable_function;
        $target.appendChild($teachable_function);
        
    }
}

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 400;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    let progress = document.getElementById("progress");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
        progress.appendChild(document.createElement("progress"));
        progress.childNodes[i].value = 0;
        progress.childNodes[i].max = 100;

    }
    
    
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    
    await predict();
    
    window.requestAnimationFrame(loop);
    
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    
    
    const prediction = await model.predict(posenetOutput);
    
    
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
        progress.childNodes[i].value = prediction[i].probability.toFixed(2) * 100;
        
        
    }
    document.getElementById("count").innerHTML=count;
    if(score_on){
        var score = Math.round(prediction[1].probability*100);
        document.querySelector("#score").innerHTML=score;
        if (score > 90){
            count++;
            audio2.play();
            document.getElementById("pose").src="images/posture2.png";
            status = "uphand";
        if (count >= 5){
            today = new Date();
            count = 0;
            webcam.pause();
            webcam_status = true;
            sound_check = false;
            //alert("goodjob!");
            canvas.style.display="none";
        }
        }
        score_on = false;
    }

    
    
    if (prediction[0].probability > 0.9){
        status="nomal";
        document.getElementById("pose").src="/images/posture.png";
        if (ready_tf==false){
            ready();
        }
    }
    
    // finally draw the poses
    drawPose(pose);
    
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            //tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            //tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

async function ready(){
    ready_tf = true;
    let i = 4;
    var timers = document.querySelector("#posetime");
    for (;i > 0;i--) {
        timers.innerHTML=i;
        await sleep(1000);
    }
    score_on = true;
    
    ready_tf = false;
    
}