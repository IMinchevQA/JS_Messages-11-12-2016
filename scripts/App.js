function startApp() {
    sessionStorage.clear();
    showHideMenuLinks();
    showView('viewAppHome');
    $("#loadingBox, #infoBox, #errorBox").hide();


    $('#linkMenuAppHome').click(showHomeView);
    $('#linkMenuLogin').click(showLoginView);
    $('#linkMenuRegister').click(showRegisterView);
    $('#linkMenuUserHome').click(showUserHomeView);
    $('#linkMenuLogout').click(logoutUser);
    $('#linkMenuMyMessages, #linkUserHomeMyMessages').click(listMessages);
    $('#linkMenuArchiveSent, #linkUserHomeArchiveSent').click(getSentMessages);
    $('#linkMenuSendMessage, #linkUserHomeSendMessage').click(showSendMessageView);


    
    $('#formLogin').submit(loginUser);
    $('#formRegister').submit(registerUser);
    $('#formSendMessage').submit(sendMessage)


//Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {$('#loadingBox').show()},
        ajaxStop: function () {$('#loadingBox').hide()}
    });


}