var current_mode = localStorage.getItem('current_mode') || 'light';

$(document).ready(function(){
        $('#nav-icon4').click(function(){
          $(this).toggleClass('open');
        });
      });

      document.addEventListener('mousemove', function (e) {
        document.documentElement.style.setProperty('--mouseX', e.clientX);
        document.documentElement.style.setProperty('--mouseY', e.clientY);
      });

      $(document).on("click", '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
      });

      
      if (current_mode == 'dark') {
      document.getElementById('site').classList.remove('light');
      document.getElementById('site').classList.add('dark');

      } else {
      document.getElementById('site').classList.remove('dark');
      document.getElementById('site').classList.add('light');
      } 


      $(".darkmode").click(function(){ 
          if (current_mode == 'dark') {
          document.getElementById('site').classList.remove('dark');
          document.getElementById('site').classList.add('light');
          current_mode = 'light';
          localStorage.setItem("current_mode", 'light');
          } else {
          document.getElementById('site').classList.remove('light');
          document.getElementById('site').classList.add('dark');
          current_mode = 'dark';
          localStorage.setItem("current_mode", 'dark');
          } 
      });