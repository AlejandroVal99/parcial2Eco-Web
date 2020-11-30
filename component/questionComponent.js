class questionComponent{
    constructor (question){
        this.quesiton = question;
    }
    eliminarPre = () =>{
        let id = this.quesiton.id;
        database.ref('parcial2/historico/'+id).set(null);
    }


    render = () =>{
        let preComponent = document.createElement('div');
        preComponent.className='preComponent';
        
        let textPregunta = document.createElement('p');
        textPregunta.className = 'textPregunta';
        textPregunta.innerHTML=this.quesiton.pregunta;

        let puntaPregunta = document.createElement('p');
        puntaPregunta.className='puntaPregunta';
        puntaPregunta.innerHTML=this.quesiton.puntaje;

        let btn_Eliminar = document.createElement('button');
        btn_Eliminar.className='btn_Eliminar';
        btn_Eliminar.innerHTML='Eliminar pregunta'
        
        preComponent.appendChild(textPregunta);
        preComponent.appendChild(puntaPregunta);
        preComponent.appendChild(btn_Eliminar);

        btn_Eliminar.addEventListener('click',this.eliminarPre);

        return preComponent;


    }



}