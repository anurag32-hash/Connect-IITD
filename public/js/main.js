const socket=io();
msgForm = document.getElementById('msgForm');
allmessages = document.querySelector('.allmessages');

socket.on('message', message => {
    if(message.length>0){
        outputMessage(message);
        allmessages.scrollTop = allmessages.scrollHeight;    
    }
});

// This is used to send message to all logged on users...
msgForm.addEventListener('submit', (e) => {
    const msg=e.target.elements.newmsg.value;
    const username = e.target.elements.username.value;
    message={
        msg,
        username
    };
    if(msg.length>0)
        socket.emit('postMsg',message);
});

function outputMessage(msg)
{
    const div = document.createElement('div');
    div.classList.add('mymsg');
    div.innerHTML=`
        <B>${msg.username}: </B>${msg.message}
        <span class="mytime">${msg.time}</span>
        </div>
        <div class="myspacing">&nbsp;</div>
    `;
    document.querySelector('.allmessages').appendChild(div);
}


// Init display:
allmessages.scrollTop = allmessages.scrollHeight;
newmsg.focus();

function checkPostDelete(u1, u2)
{
    //window.alert('u1: ' + u1 + ', u2: ' + u2);
    //console.log('u1: ' + u1 + ', u2: ' + u2);
    return confirm('Are you sure to delete this Post?');
}