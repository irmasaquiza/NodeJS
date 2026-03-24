const z = require('zod');


    movieSchema = z.object({
        title: z.string(),
        year: z.number().int().gte(1888).lte(new Date().getFullYear()),
        director: z.string(),});

function validateMovie(objeto){
return movieSchema.safeParse(objeto);
}   

function parcialUpdateMovie(objeto){
    return movieSchema.partial().safeParse(objeto);


}

module.exports = {validateMovie , parcialUpdateMovie};