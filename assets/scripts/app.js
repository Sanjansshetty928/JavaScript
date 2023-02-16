const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector('header button');
console.log(addMovieModal);
//  const startAddMovieButton = document.querySelector('header').lastElementChild;
console.log(startAddMovieButton);
// const backdrop=document.getElementById('backdrop');
const backdrop = document.body.firstElementChild;
//for cancelling the modal or movie
const cancelBut = document.querySelector('.modal__actions button:first-of-type');
//for adding the movie 
const confirmAddMovieButton = document.querySelector('.modal__actions button:last-of-type')
//for entering the input fields
const entryTextSection = document.getElementById('entry-text');
//for deleting the modal
const deleteMovieModal=document.getElementById('delete-modal');

//used coming back to the main page-when I open the modal box and when we click outside the block, the modal box disappears
const toggleBackdrop = () => {
    backdrop.classList.toggle('ivisible');
    

}

//for updating the UI interface as the changes are done
const updateUi = () => {
    //no movies being entered
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';

    }
    else
        entryTextSection.style.display = 'none';

}

//for closing the modal
const closeMovieDeletionModal=()=>{
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}


//for handling the movie delete
const deleteMovieHandler=movieId=>{
    let movieIndex=0;
    for(const movie of movies){
        if(movie.id===movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex,1);//takes index as a input.items will be moved
    const listRoot = document.getElementById('movie-list')
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUi();



}



const startDeleteMovieHandler=movieId=>{
    
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancel=deleteMovieModal.querySelector('.btn--passive');
    let add=deleteMovieModal.querySelector('.btn--danger');

    add.replaceWith(add.cloneNode(true));
    add=deleteMovieModal.querySelector('.btn--danger');


    cancel.removeEventListener('click',closeMovieDeletionModal)
    cancel.addEventListener('click',closeMovieDeletionModal);
    add.addEventListener('click',deleteMovieHandler.bind(null,movieId));

    // deleteMovie(movieId);
    

}

//for getting the entered input values on the screen
const renderMovieElement = (id,title, imageUrlValue, ratingValue) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrlValue}" alt="${title}">
    </div>    
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${ratingValue}/5 stars</p>
    </div>`//we can use a multiline string
        ;
        newMovieElement.addEventListener('click',startDeleteMovieHandler.bind(null,id));
    const listRoot = document.getElementById('movie-list')
    listRoot.append(newMovieElement);


}





const closeMovieModal=()=>{
    addMovieModal.classList.remove('visible');

}









const userInputs = addMovieModal.querySelectorAll('input');
//for storing of the movies
const movies = [];



console.log(backdrop);

const cancelAddMovieHandler=()=>{
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
}

const backdropClickHandler=()=>{
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
}

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
    //  clearMovieInputs();

};
startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);


console.log(cancelBut);
cancelBut.addEventListener('click', cancelAddMovieHandler);


const clearMovieInputs = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
}

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    //removes access white space- use of trim
    if (titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5) {
        alert('please enter value between 1 and 5');
        return;
    }
    const newMovies = {
        id:Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue

    };
    clearMovieInputs();
    movies.push(newMovies);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderMovieElement(newMovies.id,newMovies.title,newMovies.image,newMovies.rating)
    updateUi();

}


confirmAddMovieButton.addEventListener('click', addMovieHandler)
// deleteMovieModal.addEventListener('click',deleteMovie);