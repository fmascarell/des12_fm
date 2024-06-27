import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { UsersRepository } from '../repositories/index.js';
import { createHash, isValidPassword } from '../utils/bcryptPassword.js';

const LocalStrategy = local.Strategy;

export const initializaPassport = () => {
  passport.use('register', new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        try {
          const { confirmPassword } = req.body;
          console.log('Attempting to register user:', username);
          if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return done(null, false);
          }
          const user = await UsersRepository.getUserByEmail(username);
          if (user) {
            console.log('User already exists: ', username);
            return done(null, false);
          }
          const hashedPassword = createHash(password);
          const newUser = await UsersRepository.registerUser({
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

  passport.use('login', new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          console.log('Attempting to login user:', username);
          const user = await UsersRepository.getUserByEmail(username);
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
    console.log('Serializing user:', user._id);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UsersRepository.getUserById(id);
      console.log('Deserializing user:', user);
      done(null, user);
    } catch (error) {
      console.error('Error during deserialization:', error);
      done(error);
    }
  });

  passport.use(new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log({ profile });
        const email = profile._json.email;
        const user = await UsersRepository.getUserByEmail(email);

        if (user) 
            return done(null, user);

        const newUser = {
            name: profile._json.name,
            email,
            password: '.$',
            image: profile._json.avatar_url,
            github: true
        };

        const result = await UsersRepository.registerUser({ ...newUser });
        return done(null, result);

      } catch (error) {
        console.error('Error during GitHub authentication:', error);
        return done(error, null);
      }
    }
  ));
};
