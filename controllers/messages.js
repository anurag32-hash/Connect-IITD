function formatMessage(username, message){
    var d = new Date();
    var n = d.toLocaleDateString() + " " + d.toLocaleTimeString();
    return {
        username,
        message,
        time: n
    };
}

module.exports = formatMessage;