//No olvidar => Este código configura las estrategias de registro e inicio de sesión y maneja
//cómo se serializan y deserializan los usuarios en la sesión

//import passport from "passport";
//import local from 'passport-local';
//import { getUserById, getUserEmail, registerUser } from "../services/user.js";
//import { createHash, isValidPassword } from "../utils/bcryptPassword.js";
//
//const LocalStrategy = local.Strategy;
//
//export const initializaPassport = () => {
//    passport.use('register', new LocalStrategy(
//        {passReqToCallback: true, usernameField: 'email'},
//        async (req, username, password, done) => {
//            try {
//                const { confirmPassword } = req.body;
//                if (password !== confirmPassword)
//                {
//                    console.log('No coinciden las contraseñas');
//                    return done(null, false);
//                }
//                const user = await getUserEmail(username);
//
//                if (user) {
//                    console.log('El usuario ya existe');
//                    return done(null, false);
//                }
//
//                req.body.password = createHash(password);
//                const newUser = await registerUser({ ...req.body });
//
//                if (newUser)
//                    return done(null, newUser);
//
//                return done(null, newUser);
//
//            } catch (error) {
//                done(error);
//            }
//        }));
//
//    passport.use('login', new LocalStrategy(
//        {usernameField: 'email'},
//        async (username, password, done) => {
//            try {
//                const user = await getUserEmail(username);
//
//                if(!user)
//                {
//                    console.log('El usuario no existe');
//                    done(null, false);
//                }
//
//                if (!isValidPassword(password, user.password))
//                {
//                    console.log('Las contraseñas no coinciden');
//                    return done(null, false);
//                }
//                return done(null, false);
//
//            } catch (error) {
//                done(error);
//            }
//        }));
//
//    passport.serializeUser((user, done) => {
//        done(null, user._id);
//    });
//
//    passport.deserializeUser(async(id, done) => {
//        const user = await getUserById(id);
//        done(null, user);
//    });
//};

import passport from "passport";
import local from "passport-local";
import GitHubStrategy from 'passport-github2';
import { getUserById, getUserEmail, registerUser } from "../services/user.js";
import { createHash, isValidPassword } from "../utils/bcryptPassword.js";

const LocalStrategy = local.Strategy;

export const initializaPassport = () => {
  passport.use('register', new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { confirmPassword } = req.body;
          console.log("Attempting to register user:", username);
          if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return done(null, false);
          }
          const user = await getUserEmail(username);
          if (user) {
            console.log('User already exists: ', username);
            return done(null, false);
          }
          const hashedPassword = createHash(password);
          const newUser = await registerUser({
            ...req.body,
            password: hashedPassword,
          });
          console.log('Registration successful: ', newUser);
          return done(null, newUser);
        } catch (error) {
          console.error('Error during registration: ', error);
          done(error);
        }
      }
    )
  );

  passport.use('login',new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          console.log('Attempting to login user:', username);
          const user = await getUserEmail(username);
          if (!user) {
            console.log('User does not exist:', username);
            return done(null, false);
          }
          if (!isValidPassword(password, user.password)) {
            console.log('Invalid password for user:', username);
            return done(null, false);
          }
          console.log('Login successful for user:', username);
          return done(null, user);
        } catch (error) {
          console.error('Error during login:', error);
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user._id);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      console.log("Deserializing user:", user);
      done(null, user);
    } catch (error) {
      console.error("Error during deserialization:", error);
      done(error);
    }
  });

  passport.use('github', new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log({profile});
        const email = profile._json.email;
        const user = await getUserEmail(email);

        if (user) 
            return done(null, user);

        const newUser = {
            name: profile._json.name,
            email,
            password: '.$',
            image: profile._json.avatar_url,
            github: true
        };

        const result = await registerUser({...newUser});
        return done(null, result);
        
      } catch (error) {
        console.error('Error during GitHub authentication:', error);
        return done(error, null);
      }
    }
  ));
};
