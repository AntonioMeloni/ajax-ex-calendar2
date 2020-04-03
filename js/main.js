$(document).ready(function () {

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);

    // Stampare il mese di Gennaio 2018
    // Tramite click stampare il mese successivo
    var mese = 0;
    var dataIniziale = moment('2018-01-01');
    stampaGiorniMese(dataIniziale); // Inizializzazione Calendario
    stampaFestivi();

    $('.mese-succ').click(function () {
        mese = mese + 1;
        if (mese==12) {
          alert('Questo calendario è solo del 2018! Non puoi andare al 2019');
          mese = mese -1;
          dataIniziale.subtract(1, 'month');
        }
        dataIniziale.add(1, 'month');
        stampaGiorniMese(dataIniziale);
        stampaFestivi();
    });
    $('.mese-prec').click(function () {
        mese = mese - 1;
        if (mese<0) {
          alert('Questo calendario è solo del 2018! Non puoi andare al 2017');
          mese = mese + 1;
          dataIniziale.add(1, 'month');
        }
        dataIniziale.subtract(1, 'month');
        stampaGiorniMese(dataIniziale);
        stampaFestivi();
    });

    function stampaFestivi() {
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: 2018,
                month: mese
            },
            success: function (data) {
                var giorniFestivi = data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo = giorniFestivi[i];
                    var nomeFestivo = giornoFestivo.name;
                    var dataFestivo = giornoFestivo.date;
                    console.log(dataFestivo);
                    $('#calendar li[data-day="' + dataFestivo + '"]').addClass('festivo').append(' - ' + nomeFestivo);
                }
            }
        });
    }

    function stampaGiorniMese(meseDaStampare) {
        $('#calendar').empty();
        var standardDay = meseDaStampare.clone();
        var giorniMese = meseDaStampare.daysInMonth();
        var nomeMese = meseDaStampare.format('MMMM');
        $('#nome-mese').text(nomeMese); // Aggiorniamo il nome del mese in top calendar
        for (var i = 1; i <= giorniMese; i++) {
            // $('#calendar').append('<li>' + i + ' ' + nomeMese + '</li>');
            var giornoDaInserire = {
                day: i + ' ' + nomeMese,
                dataDay: standardDay.format('YYYY-MM-DD')
            }
            var templateFinale = templateGiorno(giornoDaInserire); // Stiamo popolando il template con i dati dell'oggetto
            $('#calendar').append(templateFinale);
            standardDay.add(1, 'day');
        }
    }

});
