import {ApolloError} from 'apollo-server-errors';
import User from '../models/UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const resolveFunctions = {
  Query: {
    async users() {
      const users = await User.find();
      return users;
    },
    user: (_, {ID}) => User.findById(ID),
  },
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
        process.env.JWT_SECRET,
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

        user.token = token;

        // Save user in MongoDB
        const res = await user.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } else {
        throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
      }
    },
  },
};

module.exports = resolveFunctions;
