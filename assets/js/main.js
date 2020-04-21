$(document).ready( function() {

/*********************************
 * 
 * WhatsApp Web
 * 
 *********************************/

 var accountRow = $('.side_account__profiles .profile_row');
 var chatInput = $('.col_send__input .chatInput');
 var iconActionSend = $('.col_send__action .actionSend');
 var ulChat = $('.chat_row-chatting .ul-conversation.active-chat');
 

// aggiungo Funzionalità al click su una RowProfile
accountRow.click( function() { 

    // Classe css "active" per evidenziare il profilo
    $('.profile_row.active').removeClass('active');
    $(this).addClass('active');



    var element = $(this).attr('data-element');

    // Reset della classe
    $('.chat_row-chatting .ul-conversation').removeClass('active-chat');

    // Show active
    $('.chat_row-chatting .ul-conversation[data-element="' + element + '"]').addClass('active-chat')



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

//Filtro la lista quando comincio a scrivere nell'input
$('.side_account__search input').on('keyup', function() {
    var value = $(this).val().toLowerCase().trim();

    $('#mylist li').filter(function () {

        $(this).toggle($(this).text().toLowerCase().includes(value))

    });
     
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
        if(event.which == 13) {
            sendMessage(chatInput.val());
        };
    };
});

// CLiccando il simbolo dell'invio

$(iconActionSend).click( function() {

    // controllo che nell'input sia stato scritto qualcosa
    if(chatInput.val() !== ''){
        sendMessage(chatInput.val());
    }    
});

// Dropdown menu dei messaggi pre-caricati
dropdownMessages()



/***************
 *  FUNCTIONS
***************/

function hour() {
    // prendo info data dal sistema
    var dateNow = new Date(); 
    // assegno solo ora e minuti
    hourNow = (dateNow.getHours()<10?'0':'') + dateNow.getHours() + ':' + (dateNow.getMinutes()<10?'0':'') + dateNow.getMinutes(); 
}


function usMex() {
    // Chiamo funzione hour per avere orario esatto dell'invio
    hour();
    //Inserisco orario nello span
    var h = $('.template .mex .hMex');
    h.html(hourNow);

    //Clono il template
    var usMexClone = $('.template .mex').clone();

    usMexClone.children('.mex-text').text('Ok!');

    //Inserisco mex nella ul della chat
    $('.chat_row-chatting .ul-conversation.active-chat').append(usMexClone);

    //pulisco lo span con l'orario
     h.html('');

    // il contenitore mantiene il focus sull'ultimo messaggio arrivato
    scrollchat()
     
    // Collegamenti alle funzioni Dropdown dei messaggi
    dropdownMessages();

    // Quando il bot risponde setto la stringa dell'ultimo accesso su "online"
    online()

    // Dopo 4 sec simulo la chiusura dell'app da parte del bot
    // aggiungendo la stringa originale, aggiornata con il nuovo orario-
    setTimeout(onlineOff, 4000)
};

// Invia nuovo messaggio
function sendMessage(input) {
    

    // Chiamo funzione hour per avere orario esatto dell'invio
    hour();
    //Inserisco orario nello span
    var h = $('.template .mex .hMex');
    h.html(hourNow);

    //Clono il template
    var myMexClone = $('.template .mex').clone();     
    
    myMexClone.addClass('myMex');

    // Collegamenti alle funzioni Dropdown dei messaggi
    dropdownMessages();

    //Inserisco il testo
    myMexClone.prepend(chatInput.val());
    
    //Inserisco mex nella ul della chat
    $('.chat_row-chatting .ul-conversation.active-chat').append(myMexClone);

    //Puliamo il campo input
    chatInput.val('');

    //pulisco lo span con l'orario
    h.html('');
    
    // Chiamo una funzione che mi da una risposta automatica dopo 1.5s
    setTimeout(usMex, 1000);

    // il contenitore mantiene il focus sull'ultimo messaggio arrivato
    scrollchat()

};


// Gestione Dropdowmn menu dei messaggi
function dropdownMessages() {
    
    // Toggle quando il mouse entra in un mex
    $('.chat_row-chatting ul li.mex').mouseenter( function() {   
    
        // faccio il toggle dell'elemento dove sono in hover
        $(this).children('.dropdown-icon').toggle();;
        console.log('entrato');

    }); 

    //  Toggle del dropdown menu quando il mouse esce dal mex 
    $('.chat_row-chatting ul li.mex').mouseleave( function() {    

        $(this).children('.dropdown-icon').toggle();   

    });

    // Apertura dropdown menu al click sull'icona
    $('.chat_row-chatting ul li .dropdown-icon i').click( function() {

        $(this).next('.dropdown_menu').toggle();

    });

    // Delete mex tramite pulsante "Delete Message" nel dropdown-menu
    $('.chat_row-chatting .dropdown_menu .link_delete').click( function() {

        // Elimina il messaggio
        $(this).parents('.mex').remove()

    });

    // Aggiunge stringa anziché rimuovere il messaggio
    $('.chat_row-chatting .dropdown_menu .link_deleteAll').click( function() {

        // Sostituisci testo messaggio e aggiungo classe per stile
        $(this).parents('.mex').text('Questo messaggio è stato eliminato.').addClass('mex-deleted')

    });
    
        
};

// Funzione per lo scroll

function scrollchat() {

    $('.chat_row-chatting').scrollTop($('.chat_row-chatting').prop('scrollHeight'))

};

// funzione che richiamo per settare per un tot di secondi lo stato online al contatto
function online() {
    $('.chat_row-info .col_info__name h3').text('online');
}

// Passati i secondi di stato online ripristino la stringa aggiornandola all'orario di sistema
function onlineOff() {
    hour()
    $('.chat_row-info .col_info__name h3').text('ultimo accesso oggi alle ' + hourNow);
}

/**
 * 
 *  NOTA BENE: quando l'orario si aggiorna, lo fa per tutti i contatti. 
 *  Per poter avere l'ultimo accesso aggiornato per ogni contatto
 *  avrei dovuto fare molte modifiche. Non essendo una task dell'esercizio
 *  preferisco non rischiare di rovinare il lavoro prima della valutazione.
 * 
 *  In seguito, nei prossimi giorni, provvederò a modificare l'assetto del tutto
 *  per rendere anche questa funzione unica per ogni utente e chat.
 *
 * 
 */

}); // <- End Doc Ready