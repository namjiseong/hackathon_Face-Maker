class teachable_machine_init{
    $teachable_machine_init = null;
    $time = null;
    constructor($target){
        const $teachable_machine_init = document.createElement("div");
      $teachable_machine_init.className = "teachable_machine_init";
      $teachable_machine_init.innerHTML = `
      <h1>this is main</h1>
        <div id="today"></div>
        <div id="sec"></div>
        <div id="count"></div>
        
        <div>Teachable Machine Pose Model</div>
    <button type="button" onclick="init()">Start</button>
    <section class="picture">
        <div><canvas id="canvas"></canvas></div>
        <img id="pose" src="images/posture.png" width="400" height="400">
    </section>
    <section class="labels">
    <div id="label-container"></div>
    <div id="progress"></div>
    </section>
    
    
      `;
      this.$teachable_machine_init = $teachable_machine_init;
      $target.appendChild(this.$teachable_machine_init);

      const $time = document.createElement("script");
      $time.className = "timecount";
      $time.innerHTML = `
      var audio = new Audio('/sound/alarm.wav');
      var today = new Date();
            var timerId = null;
            var sound_check = false;
            function check() {
                
                
                var now = new Date();
                document.getElementById("today").innerHTML=now;
                var sec = (now - today) / 1000 / 60;
                document.getElementById("sec").innerHTML=sec;
                if (sec > 0.2){
                    
                    if (webcam_status == true){
                        if (sound_check == false){
                            audio.play();
                            sound_check = true;
                        }
                        
                        webcam.play();
                    }
                    
                }
                    
                
            }
            timerId = setInterval(check, 1000);
            
      `;

      this.$time = $time;
      $target.appendChild(this.$time);
    }
}