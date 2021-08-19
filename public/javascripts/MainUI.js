class MainUI {
 
  $teachable_machine_init = null;
  $teachable_function = null;
  $timer = null;
  constructor($target) {
    
    

    
    this.$teachable_function = new teachable_function($target);
    this.$teachable_machine_init = new teachable_machine_init($target);
    this.$timer = new timer($target);
    
  }
  
  

  
    
}