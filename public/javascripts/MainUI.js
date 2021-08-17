class MainUI {
  $mainDiv = null;
  $teachable_machine_init = null;
  $teachable_function = null;

  constructor($target) {
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "MainDiv";
    $target.appendChild($mainDiv);
    this.$teachable_machine_init = new teachable_machine_init($target);
    
    this.$teachable_function = new teachable_function($target);

  }
  
  

  
    
}