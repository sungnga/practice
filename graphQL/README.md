# NOTES

## S1: WHY GRAPHQL?
### REST-ful Routing
- Given a collection of records on a server, there should be a uniform URL and HTTP request method used to utilize that collection of records
- REST-ful routing is some set of conventions used in web development for manipulating a collection of data hosted on the server
- These are common rules around the type of HTTP request and the URL used to send them to that are used for reading, creating, updating or deleting data that is sitting on the server
- HTTP methods: POST to create, GET to fetch, PUT to update, and DELETE to delete

### Shortcomings for RESTful Routing
- 1. Deciding on a URL schema gets tough when we start to have heavily nested relationships between data
- 2. When fetching heavily nested data, could run into situations where we make too many HTTP requests to get the data that we need
- 3. We're vulnerable to over fetching data

### GraphQL
- GraphQL creates fast and flexible APIs, giving clients complete control to ask for just the data they need
- Fewer HTTP requests. Flexible data querying. Less code to manage


## S2: GRAPHQL BASICS: SCHEMAS AND QUERIES
### What is a Graph?
- Thinking and representing data in graphQL
- **TYPE** 
  - Are things that we define when creating graphQL APIs. When we define the types that make up our applications, we also define the fields associated with each type, the individual pieces of data we want to store
- **FIELD**
  - Each type has its own custom set of fields. For example, a User type may have id, name, and age fields
- **PROPERTY** 
  - A type may have relationship and association with other types. This relationship is called property

  ### GraphQL Queries