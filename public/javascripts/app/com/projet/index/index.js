/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var socket = io.connect(window.location.hostname);

socket.on('refreshScreenClient', function(data){
    
  console.log(data.dataComptes);
  
  var listeComptes = data.dataComptes;
  var nbCompte = data.dataComptes.length;
  
  var element = null;
  
  $("ul#listeCompte").empty();
  
  for (var i = 0; i < nbCompte; i++) {
      element = listeComptes[i];
      
      $("ul#listeCompte").append('<li>'+element.login+'</li>')
      
      console.log(element);
      element = null;
  }
   
  socket.emit('refreshScreenClientDone', { my: 'data' });

});