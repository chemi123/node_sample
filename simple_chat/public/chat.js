$(() => {
  let socket = io.connect('http://192.168.33.10:3000');

  let message = $("#message");
  let username = $("#username");
  let send_username = $("#send_username");
  let send_message = $("#send_message");
  let chatroom = $("#chatroom");

  // Emit a username
  send_username.click(() => {
    console.log(username.val());
    socket.emit('change_username', { username : username.val() });
    username.val('');
  });

  // Emit message
  send_message.click(() => {
    console.log(message.val());
    socket.emit('new_message', { message : message.val() });
    message.val('');
  });

  // Listen on new message
  socket.on('new_message', data => {
    chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
  });
});
