const z = require('zod');

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().gte(1888).lte(new Date().getFullYear()),
  director: z.string(),
  duration: z.number().int().positive('Movie duration must be a positive number'),
  poster: z.string().url('Poster must be a valid URL'),
  genre: z.array(z.string()),
  rate: z.number().min(0).max(10).optional().default(0)
});

function validateMovie(object) {
  return movieSchema.safeParse(object);
}

function parcialUpdateMovie(object) {
  return movieSchema.partial().safeParse(object);
}

module.exports = { validateMovie, parcialUpdateMovie };
