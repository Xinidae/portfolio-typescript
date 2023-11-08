import * as z from 'zod'

// User Validation

export const SignUpValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long"}),
    username: z.string().min(2, { message: "Username must be at least 2 characters long"}),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long"}),
});
  
export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long"}),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters long"}),
  username: z.string().min(2, { message: "Username must be at least 2 characters long"}),
  email: z.string().email(),
  bio: z.string(),
});


// Posting Validation

export const PostValidation = z.object({
  caption: z.string().min(2, { message: "Caption must be at least 2 characters long"}).max(2500, { message: "Caption must be less than 2500 characters long"}),
  file: z.custom<File[]>(),
  location: z.string().min(2, { message: "Location must be at least 2 characters long"}).max(30, { message: "Location must be less than 30 characters long"}),
  tags: z.string(),
});
