const typeDefinitions = `
  type User {
			name: String,
      description: String
	}
	type RootQuery {
	  user : [User]
	}
	schema {
	  query: RootQuery
	}
`;

module.exports = [typeDefinitions];
