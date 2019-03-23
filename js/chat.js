$(function() {
  let wsUrl = 'ws://xxx.xxx.xxx.xxx:xxxx';
  let ws = new WebSocket(wsUrl);
  ws.onopen = function(evt) {
    console.log('ws(chat) open()');
  };
  ws.onerror = function(err) {
    console.error('ws(chat) onerror() ERR:', err);
  };

  ws.onmessage = function(evt) {
    let data = JSON.parse(evt.data);

    // 対象：チャットでメッセージが来た場合
    if (data.isMessage) {
      $('#chatRoom').append(data.name + '：' + data.message +'<br>');

      // スクロールを一番下に固定する
      let chatHeight = $('#chatRoom').prop("scrollHeight");
      $('#chatRoom').scrollTop(chatHeight);
    }
  };

  // 入力ボタンクリックし、メッセージを送る
  $('#send').bind('click', function() {
    let name    = $('#name').val();
    let message = $('#message').val();
    let data    = { isMessage: true, name: name, message: message };
    let msg     = JSON.stringify(data);

    $('#chatRoom').append(name + '：' + message + '<br>');
    $('#message').val('');

    ws.send(msg);

    // スクロールを一番下に固定する
    let chatHeight = $('#chatRoom').prop("scrollHeight");
    $('#chatRoom').scrollTop(chatHeight);
  });

  // Enterキーでメッセージを送る
  $("#message").keypress(function(e){
    if(e.which == 13){
      let name    = $('#name').val();
      let message = $('#message').val();
      let data    = { isMessage: true, name: name, message: message };
      let msg     = JSON.stringify(data);

      $('#chatRoom').append(name + '：' + message + '<br>');
      $('#message').val('');

      ws.send(msg);

      // スクロールを一番下に固定する
      let chatHeight = $('#chatRoom').prop("scrollHeight");
      $('#chatRoom').scrollTop(chatHeight);
    }
  });
});
