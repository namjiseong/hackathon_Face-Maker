class timer{
    $timer = null;
    $time = null;
    constructor($target){
        
      const $time = document.createElement("script");
      $time.className = "timer";
      $time.innerHTML = `
      var audio = new Audio('/sound/alarm.wav');
      
      var today = new Date();
      timerId = null;
            
      timerId = setInterval(check, 1000);
            
      `;

      this.$time = $time;
      $target.appendChild($time);
      

      
    }
    
    
}

function check() {
                
                
    var now = new Date();
    document.getElementById("today").innerHTML=now;
    var sec = Math.round((now - today) / 1000);
    document.getElementById("sec").innerHTML=sec + "초";
    if (sec > 20){
        
        if (webcam_status == true){
            if (sound_check == false){
                //audio.play();
                sound_check = true;
                //window.open("/alert", "_blank", "width=200, height=200, top=300, left=500")
            }
            
            webcam.play();
            canvas.style.display="block";
        }
        
    }
        
    
}