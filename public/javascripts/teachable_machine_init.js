class teachable_machine_init{
    $teachable_machine_init = null;

    constructor($target){
        const $teachable_machine_init = document.createElement("div");
      $teachable_machine_init.className = "teachable_machine_init";
      $teachable_machine_init.innerHTML = `
      <h1>this is main</h1>
        <div id="today"></div>
        <div id="sec"></div>
        <div id="count"></div>
        <script>
            var today = new Date();
            var timerId = null;
            function check() {
                
                
                var now = new Date();
                document.getElementById("today").innerHTML=now;
                var sec = (now - today) / 1000 / 60;
                document.getElementById("sec").innerHTML=sec;
                    
                    
                
            }
             timerId = setInterval(check, 1000);
        </script>
        <div>Teachable Machine Pose Model</div>
    <button type="button" onclick="init()">Start</button>
    <section class="picture">
        <div><canvas id="canvas"></canvas></div>
        <img id="pose" src="images/posture.png" width="400" height="400">
    </section>
    <div id="label-container"></div>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
    <script type="text/javascript">
        // More API functions here:
        // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose
    
        // the link to your model provided by Teachable Machine export panel
        const URL = "https://teachablemachine.withgoogle.com/models/g9RBx3WyR/";
        let model, webcam, ctx, labelContainer, maxPredictions;
        var count = 0;
        var status = "nomal";
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
            for (let i = 0; i < maxPredictions; i++) { // and class labels
                labelContainer.appendChild(document.createElement("div"));
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
            }
            document.getElementById("count").innerHTML=count;
            if (prediction[1].probability > 0.9){
                if (status == "nomal"){
                    count += 1;
                    document.getElementById("pose").src="images/posture2.png";
                }
                
                status = "uphand";
                if (count >= 5){
                    today = new Date();
                    count = 0;
                    webcam.stop();
                    canvas.style.display="none";
                }
                
            }
            if (prediction[0].probability > 0.9){
                status="nomal";
                document.getElementById("pose").src="/images/posture.png";
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
                    tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                    tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
                }
            }
        }
    </script>
    
      `;
      this.$teachable_machine_init = $teachable_machine_init;
      $target.appendChild(this.$teachable_machine_init);
    }
}