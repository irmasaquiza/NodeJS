const express = require('express');
const crypto = require('node:crypto');
const peliculas = require('./movies.json');
const app = express();
app.use(express.json()); // middleware para parsear JSON
app.disable('x-powered-by');
const {validateMovie} = require('./schemas/movie.js');
const {parcialUpdateMovie} = require('./schemas/movie.js');

const PORT = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
  res.send('Hola Mundosss');
});
// recuperar las peliculas
app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
const {genre} = req.query;
if(genre){
    const moviesByGenre = peliculas.filter(
        movie => movie.genre.includes(genre)
    );
    return res.json(moviesByGenre);
}

  res.json(peliculas);
}); // endpoint para recuperar todas las peliculas


app.get('/movies/:id', (req, res) => {
    const {id} = req.params;
    const movie = peliculas.find(movie => movie.id == id);
    if(movie) return res.json(movie);
    res.status(404).json({message: 'Pelicula no encontrada'});

});


// crear una pelicula

app.post('/movies',(req,res)=>{
const result = validateMovie(req.body);




    const newMovie = {
    id: crypto.randomUUID(),
    title, 
    year,  // validar que sea un numero y que tenga 4 digitos 
    director,
    duration,
    poster, 
    genre, 
    rate: rate || 0 
};

    peliculas.push(newMovie); 

    res.status(201).json(newMovie);

}



);


app.patch('/movies/:id', (req, res) => {
    const {id} = req.params;
    const result = parcialUpdateMovie(req.body);
    if(!result.success) return res.status(400).json(result.error);
    const movieIndex = peliculas.findIndex(movie => movie.id == id);
    if(movieIndex===-1) return res.status(404).json({message: 'Pelicula no encontrada'});
    
const updatedMovie = {...peliculas[movieIndex], ...result.data};
peliculas[movieIndex] = updatedMovie;
return res.json(updatedMovie);
})











const server = app.listen(PORT, () => {
  console.log(`Server esta corriendo en el puerto http://localhost:${PORT}`);
});


