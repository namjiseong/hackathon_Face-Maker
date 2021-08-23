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
        
        <div>Teachable Machine Pose Model~~</div>
        <div id="score"></div>
    <button type="button" onclick="init()">Start</button>
    <section class="picture">
        <canvas id="canvas"></canvas>
        <img id="pose" src="images/posture.png" width="400" height="400"></img>
        <div id="posetime"></div>
        <div id="message">타이밍에 맞춰 그림 동작을 따라하세요!</div>
    </section>
    <section class="labels">
    <div id="label-container"></div>
    <div id="progress"></div>
    </section>
    
    
      `;
      this.$teachable_machine_init = $teachable_machine_init;
      $target.appendChild(this.$teachable_machine_init);
      document.querySelector("#message").style.display="none";
      
    }
}