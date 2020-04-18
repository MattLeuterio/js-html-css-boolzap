$(document).ready( function() {

/*********************************
 * 
 * WhatsApp Web
 * 
 * Replica della grafica (allegata sotto con gli assets) con la possibilità di avere messaggi
 * stilati e posizionati diversamente in base a: messaggio dall’utente (verdi) e messaggio
 * dall’interlocutore (bianco) assegnando due classi CSS diverse.
 * Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando icona ‘invia il
 * testo’ viene aggiunto al thread sopra, come messaggio verde (ricordate focus() )
 * Font family: Lato
 * Messaggi visibili inizialmente sono inseriti statici nell’HTML
 * Usate un template nell’html e clone() per l’ inserimento del messaggio da fare in JS
 * 
 *********************************/

 var accountRow = $('.side_account__profiles .profile_row');
 var chatInput = $('.col_send__input .chatInput');
 var iconActionSend = $('.col_send__action .actionSend');
 var ulChat = $('.chat_row-chatting ul.active-chat');

 var arrayUser = [];
 var arrayChat = [];


 //array creati per fare un test. Li lascio come appunto per me stesso
 accountRow.each( function() {

    arrayUser.push($(this));

 });

 $('.chat_row-chatting ul').each( function() {

    arrayChat.push($(this));  

 });

 console.table(arrayUser);
 console.table(arrayChat);
 

 

// aggiungo Funzionalità al click su una RowProfile
accountRow.click( function() { 

    // Classe css "active" per evidenziare il profilo
    $('.profile_row.active').removeClass('active');
    $(this).addClass('active');

    var attrThis = $(this).attr('data-element');
    console.log(attrThis);
    
    // uso un each per trovare il data-element che ha lo stesso valore di quello cliccato
    $('.chat_row-chatting ul').each( function(valore) { 

        if(attrThis == valore) {
            //rimuovo la classe dove c'è
            $('.chat_row-chatting ul.active-chat').removeClass('active-chat');
            //l'aggiungo sull'ul restituito
            $(this).addClass('active-chat')
            
            ulChat = $('.chat_row-chatting ul.active-chat');
        }

    });

    // Leggo il nome utente e l'immagine della Row
    var nameUser = $('.profile_row.active .profile_col__info .nameUser').text();
    var imgUser = $('.profile_row.active .profile_col__img').html();
    console.log(nameUser);
    console.log(imgUser);
    
    // Stampo il nome utente e l'immagine letti nella row INFO della CHAT
    $('.chat-container .chat_row-info .col_info__name .nameUser').text(nameUser);
    $('.chat-container .chat_row-info .col_info__img').html(imgUser);

    nameUser = '';

});

// cambio icona micro con icona invio al focus dell'input chat
chatInput.focus( function () {  
    $('.col_send__action a i').removeClass('fa-microphone').addClass('fa-paper-plane');
});

// torno all'icona micro quando viene tolto il focus dall'input chat
chatInput.focusout( function () {
        //controllo che il campo input sia vuoto prima di tornare all'icona del micro
        if(chatInput.val() == '') {
            $('.col_send__action a i').removeClass('fa-paper-plane').addClass('fa-microphone');
        }
}); 

//  Inviare messaggio tramite input chat

// Cliccando il tasto Invio sulla tastiera
$(chatInput).keyup(function(event) {

    // controllo che nell'input sia stato scritto qualcosa
    if(chatInput.val() !== ''){
        // Se è vero allora procedo con l'inserimento
        if(event.keyup == 13 || event.keyCode == 13) {
            // Chiamo funzione hour per avere orario esatto dell'invio
            hour();
            //Inserisco orario nello span
            var h = $('.template .myMex span');
            h.html(hourNow);

            //Clono il template
            var myMexClone = $('.template .myMex').clone();     
      
            //Inserisco il testo
            myMexClone.prepend(chatInput.val());
            
            //Inserisco mex nella ul della chat

            ulChat.append(myMexClone);

            //Puliamo il campo input
            chatInput.val('');

            //pulisco lo span con l'orario
            h.html('');     
            
            // Chiamo una funzione che mi da una risposta automatica dopo 1.5s
            setTimeout(usMex, 1500);
        };
    };
});

// CLiccando il simbolo dell'invio

$(iconActionSend).click( function() {

    // controllo che nell'input sia stato scritto qualcosa
    if(chatInput.val() !== ''){
        // Se è vero allora procedo con l'inserimento
            // Chiamo funzione hour per avere orario esatto dell'invio
            hour();
            //Inserisco orario nello span
            var h = $('.template .myMex span');
            h.html(hourNow);

            //Clono il template
            var myMexClone = $('.template .myMex').clone();     
      
            //Inserisco il testo
            myMexClone.prepend(chatInput.val());
            
            //Inserisco mex nella ul della chat
            ulChat.append(myMexClone);

            //Puliamo il campo input
            chatInput.val('');

            //pulisco lo span con l'orario
            h.html('');
            
            // Chiamo una funzione che mi da una risposta automatica dopo 1.5s
            setTimeout(usMex, 1500);
        };
});



// function

function hour() {
    var dateNow = new Date(); // prendo info data dal sistema
    hourNow = (dateNow.getHours()<10?'0':'') + dateNow.getHours() + ':' + (dateNow.getMinutes()<10?'0':'') + dateNow.getMinutes(); // assegno solo ora e minuti
}


function usMex() {
    // Chiamo funzione hour per avere orario esatto dell'invio
    hour();
    //Inserisco orario nello span
    var h = $('.template .usMex span');
    h.html(hourNow);

    //Clono il template
    var usMexClone = $('.template .usMex').clone();

    //Inserisco mex nella ul della chat
    ulChat.append(usMexClone);

    //pulisco lo span con l'orario
     h.html('');

};

}); // <- End Doc Ready