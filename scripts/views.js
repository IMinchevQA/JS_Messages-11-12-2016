function showHideMenuLinks() {
    $('#menu a').hide();
    if (sessionStorage.getItem('authToken')) {
        // Logged in user
        $('#linkMenuUserHome').show();
        $('#linkMenuMyMessages').show();
        $('#linkMenuArchiveSent').show();
        $('#linkMenuSendMessage').show();
        $('#linkMenuLogout').show();
        $("#spanMenuLoggedInUser").show();
    } else {
        //No user logged in.
        $('#linkMenuAppHome').show();
        $('#linkMenuLogin').show();
        $('#linkMenuRegister').show();
        $("#spanMenuLoggedInUser").hide();
    }
};


function showView(viewName) {
    //Hide all views and show the selected view only
    $('main > section').hide();
    $('#' + viewName).show();
};

function showHomeView(){
    showView('viewAppHome');
};

function showLoginView(){
    $('#formLogin').trigger('reset');
    showView('viewLogin');

};

function showRegisterView(){
    $('#formRegister').trigger('reset');
    showView('viewRegister');
}

function showUserHomeView(){
    showView('viewUserHome');
}

function showMyMessagesView(){
    showView('viewMyMessages');
}

function showArchiveSentView(){
    showView('viewArchiveSent');
}

function showSendMessageView(){

    //Getting the possible recipients
    $.ajax({
        method: 'GET',
        url: kinveyBaseUrl + "user/" + appKey + "/",
        headers: getKinveyUserAuthHeaders(),
        success: getAllRecipientsSuccess,
        error: handleAjaxError
    });

    function getAllRecipientsSuccess(allUsers){
        $('#msgRecipientUsername').empty();
        for(let user of allUsers){
            let username = user.username;
            let name = user.name;
            if(name != undefined){
                $('#msgRecipientUsername').append($('<option>').text(`${name} (${username})`));
            } else if(name === undefined) {
                $('#msgRecipientUsername').append($('<option>').text(`${username}`));
            }
        }
        showView('viewSendMessage');

    }




}