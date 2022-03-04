import {ApolloError} from 'apollo-server-errors';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const resolveFunctions = {
  Mutation: {
    async registerUser(_, {registerInput: {username, email, password}}) {
      // Check if email exists
      const oldUser = await User.findOne({email});
      if (oldUser) {
        throw new ApolloError(
          'A user is already registered with the email' + email,
          'USER_ALREADY_EXISTS',
        );
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      // Build out mongoose model (User)
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      // Create JWT
      const token = jwt.sign(
        {
          user_id: newUser._id,
          email,
        },
        'UNSAFE_STRING',
        {
          expiresIn: '2h',
        },
      );

      newUser.token = token;

      // Save user in MongoDB
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, {loginInput: {email, password}}) {
      // Check if user exist with the email
      const user = await User.findOne({email});

      // Check if password equals
      if (user && (await bcrypt.compare(password, user.password))) {
        //Create a NEW token
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
          },
          'UNSAFE_STRING',
          {
            expiresIn: '2h',
          },
        );
        // Attatch token to user model that we found above
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
      }
    },
  },
  Query: {
    user: (_, {ID}) => User.findById(ID),
  },
};

module.exports = resolveFunctions;
