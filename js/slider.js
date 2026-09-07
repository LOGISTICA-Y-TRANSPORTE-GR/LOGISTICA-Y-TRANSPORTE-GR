(function(){
    const sliders = [...document.querySelectorAll('.testimony__body')];
    const buttonNext = document.querySelector('#next');
    const buttonBefore = document.querySelector('#before');
    let value;
    let intervalId;

    // Función para cambiar de página
    const changePage = () => {
        changePosition(1);
    };

    buttonNext.addEventListener('click', ()=>{
        clearInterval(intervalId); // Detiene el temporizador actual
        changePosition(1);
        startTimer(); // Reinicia el temporizador
    });

    buttonBefore.addEventListener('click', ()=>{
        clearInterval(intervalId); // Detiene el temporizador actual
        changePosition(-1);
        startTimer(); // Reinicia el temporizador
    });

    const changePosition = (add)=>{
        const currentTestimony = document.querySelector('.testimony__body--show').dataset.id;
        value = Number(currentTestimony);
        value+= add;

        sliders[Number(currentTestimony)-1].classList.remove('testimony__body--show');
        if(value === sliders.length+1 || value === 0){
            value = value === 0 ? sliders.length  : 1;
        }

        sliders[value-1].classList.add('testimony__body--show');
    };

    // Función para iniciar el temporizador (16 segundos para lectura cómoda)
    const startTimer = () => {
        clearInterval(intervalId);
        intervalId = setInterval(changePage, 16000);
    };

    // Pausar cambio automático cuando el usuario pasa el mouse sobre la diapositiva para leer
    const testimonyContainer = document.querySelector('.testimony__container');
    if (testimonyContainer) {
        testimonyContainer.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });
        testimonyContainer.addEventListener('mouseleave', () => {
            startTimer();
        });
    }

    // Iniciar el temporizador por primera vez
    startTimer();
})();
