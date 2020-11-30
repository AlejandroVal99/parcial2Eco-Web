pPreguntaActual = document.getElementById('preguntaAct');
puntajePreAct = document.getElementById('puntajePreAct');
containerPreHis = document.getElementById('continerPreHis');
btn_newPregunAct = document.getElementById('btn_newQuestion');
btn_EnviarHisto = document.getElementById('btn_envHistori');
textQuestion = document.getElementById('textQuestion');
let promedio;
let nRespuestas;
let totalRespuestas;




database.ref('parcial2/preActual/puntaje').on('value', function (data) {
    promedio = 0;
    nRespuestas = 0;
    totalRespuestas = 0;
    data.forEach(
        nRespu =>{
            infoRespuesta = nRespu.val();
            totalRespuestas += Number(infoRespuesta.puntaje);
            nRespuestas++;
            console.log(infoRespuesta);
            promedio = totalRespuestas/nRespuestas;

            puntajePreAct.innerHTML = promedio;
        }
    )
    
});


newPregunta = () => {
    let primeraPre = database.ref('parcial2/preActual/pregunta');

    if (textQuestion.value === '') {

        alert('No has redactado ninguna pregunta');

    } else {

        console.log("data.exists()");
        primeraPre.once('value', function (data) {

            if (data.exists()) {
                data.forEach(
                    nPregunta => {
                        console.log("Aqui no entro");
                        //Tomo info pregunta actual
                        let infoPregun = nPregunta.val();

                        //Pido el valor del puntaje
                        let pun = promedio;

                        //Borro la pregunta y el puntaje
                        database.ref('parcial2/preActual').set(null);
                        pPreguntaActual.innerHTML = 'No hay pregunta actualmente';
                        puntajePreAct.innerHTML = "";

                        //Contruccion de la pregunta del historico
                        let preguntaHis = {
                            id: infoPregun.id,
                            pregunta: infoPregun.pregunta,
                            puntaje: pun,
                        }

                        //Guardo en el historico
                        database.ref('parcial2/historico/' + infoPregun.id).set(preguntaHis);

                        //Creo la nueva pregunta actual
                        let p = textQuestion.value;
                        let reference = primeraPre.push();

                        let newPreguntaAct = {
                            pregunta: p,
                            id: reference.key,

                        }
                        reference.set(newPreguntaAct);
                        textQuestion.value = "";
                    }
                )
            } else {
                //Creo la nueva pregunta actual
                console.log("Entro aquí");
                let p = textQuestion.value;
                let reference = database.ref('parcial2/preActual/pregunta').push();

                let newPreguntaAct = {
                    pregunta: p,
                    id: reference.key,

                }
                reference.set(newPreguntaAct);
                textQuestion.value = "";
            }
        })

    }


}

enviarHistorico = () => {
    let primeraPre = database.ref('parcial2/preActual/pregunta');

    primeraPre.once('value', function (data) {

        if (data.exists()) {
            data.forEach(
                nPregunta => {
                    //Tomo info pregunta actual
                    let infoPregun = nPregunta.val();
                    //Pido el valor del puntaje
                    let pun;
                    if(promedio===0){
                        pun = "Sin puntuacion";
                    }else{
                        pun = promedio;
                    }



                    //Borro la rama
                    database.ref('parcial2/preActual').set(null);
                    pPreguntaActual.innerHTML = 'No hay pregunta actualmente';
                    puntajePreAct.innerHTML = "";
                    //Contruccion de la pregunta del historico

                    let preguntaHis = {
                        id: infoPregun.id,
                        pregunta: infoPregun.pregunta,
                        puntaje: pun,
                    }

                    //Guardo en el historico
                    database.ref('parcial2/historico/' + infoPregun.id).set(preguntaHis);

                }
            )
        }
    })

}

btn_EnviarHisto.addEventListener('click', enviarHistorico);
btn_newPregunAct.addEventListener('click', newPregunta);


database.ref('parcial2/preActual/pregunta').on(('value'), function (data) {


    data.forEach(
        nPregunta => {
            infoPreActual = nPregunta.val();
            pPreguntaActual.innerHTML = infoPreActual.pregunta;
        });


})

database.ref('parcial2/historico').on('value', function (data) {
    containerPreHis.innerHTML = '';

    data.forEach(

        nPreHistorico => {
            let infoPreHis = nPreHistorico.val();
            let preHisComponent = new questionComponent(infoPreHis);

            containerPreHis.appendChild(preHisComponent.render());

        });


})