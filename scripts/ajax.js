function getSentMessages(){
    $('#sentMessages').find('tr.msgData').remove();
    let username = sessionStorage.getItem('username')

    $.ajax({
        method: 'GET',
        url: kinveyBaseUrl + "appdata/" + appKey + "/messages" + `?query={"sender_username":"${username}"}`,
        headers: getKinveyUserAuthHeaders(),
        success: loadSentMessagesSuccess,
        error: handleAjaxError
    });

    function loadSentMessagesSuccess(sentMessages){
        for(let msg of sentMessages){
            let deleteBtn = $(`<button data-id="${msg._id}">Delete</button>`)
                .on('click', function () {
                    deleteMessage($(this).attr("data-id"))
                });
            let row = $('<tr>')
                .addClass('msgData')
            row.append($('<td>').text(msg.recipient_username));
            row.append($('<td>').text(msg.text));
            row.append($('<td>').text(formatDate(msg._kmd.ect)));
            row.append($('<td>').append(deleteBtn))

            $('#sentMessages table').append(row);
        }
        showArchiveSentView()
    }
}

function deleteMessage(sentMsgId){
    $.ajax({
        method: 'DELETE',
        url: kinveyBaseUrl + "appdata/" + appKey + '/messages/' + sentMsgId,
        headers: getKinveyUserAuthHeaders(),
        success: deleteSuccess,
        error: handleAjaxError
    });

    function deleteSuccess(){
        showInfo('Message deleted!');
        getSentMessages();

    }
}

function listMessages() {
    $('#myMessages').find('tr.msgData').remove();
    let username = sessionStorage.getItem('username')

    $.ajax({
        method: 'GET',
        url: kinveyBaseUrl + "appdata/" + appKey + "/messages" + `?query={"recipient_username":"${username}"}`,
        headers: getKinveyUserAuthHeaders(),
        success: loadMyMessagesSuccess,
        error: handleAjaxError
    });

    function loadMyMessagesSuccess(userMessages){
        for(let msg of userMessages){
            let row = $('<tr>')
                .addClass('msgData')

            if(msg.sender_name.toString() != 'undefined'){
                row.append($('<td>').text(`${msg.sender_name} (${msg.sender_username})`));
            } else {
                row.append($('<td>').text(`${msg.sender_username}`));
            }
            row.append($('<td>').text(msg.text));
            row.append($('<td>').text(formatDate(msg._kmd.ect)));
            $('#myMessages table').append(row);
        }

    }
    showMyMessagesView();
}

function formatDate(dateISO8601) {
    let date = new Date(dateISO8601);
    if (Number.isNaN(date.getDate()))
        return '';
    return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
        "." + date.getFullYear() + ' ' + date.getHours() + ':' +
        padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

    function padZeros(num) {
        return ('0' + num).slice(-2);
    }
}

function formatSender(name, username) {
    if (!name)
        return username;
    else
        return username + ' (' + name + ')';
}




function sendMessage(event){
    event.preventDefault();

    let recipientUsername = $('#msgRecipientUsername').val();
    if(recipientUsername.indexOf('(') != -1){
        let startIndex = recipientUsername.indexOf('(');
        let endIndex = recipientUsername.indexOf(')');
        // console.log(recipientUsername.substring(startIndex+1, endIndex));
        recipientUsername = recipientUsername.substring(startIndex+1, endIndex);
    }

    let msgData = {
        sender_username: sessionStorage.getItem('username'),
        sender_name: sessionStorage.getItem('name'),
        recipient_username: recipientUsername,
        text: $('#msgText').val(),
    };
    // console.log(JSON.stringify(msgData));

    $.ajax({
        method: 'POST',
        url: kinveyBaseUrl + 'appdata/' + appKey + '/messages/',
        headers: getKinveyUserAuthHeaders(),
        data: JSON.stringify(msgData),
        contentType: 'application/json',
        success: sendMessageSuccess,
        error: handleAjaxError
    });

    function sendMessageSuccess(response){
        showUserHomeView();
        showInfo('Message sent!');

    }
}
