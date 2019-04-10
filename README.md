# Video Recommendations

> This is a brown field System Design project that refactors server and database code to scale

## Getting Started
### Prerequisite
1. Download Neo4j Desktop https://neo4j.com/download/
2. Open Desktop App - Add Graph - Create a Local Graph - ```recommendations``` / ```sdc```
3. To access the graph command line: Open http://www.localhost:7474 - ```neo4j``` / ```sdc```

### Installing
```npm install```

### Seed Data
- follow the order below:
1. seed category nodes: ```npm run neo4j-seed-category```
2. seed video nodes & video BELONGS_TO category edge: ```npm run neo4j-seed-videoHTTP```
3. seed tag nodes: ```npm run neo4j-seed-tag```
4. seed video HAS_TAG tag edge: ```npm run neo4j-seed-videoHasTag```

### Build
```npm run build```

### Start Server
```npm start```

## CRUD Docs
### Express Server
- ```GET /recommendations/:id``` to get 100 videos in the same category and with one same tag as the video id.

### Apollo/GraphQL Server
- ```POST /graphql``` routes all operations

- Query Types
  - ```getRecommendations``` to get 100 videos in the same category and with one same tag as the video id.
  - ```addTag``` to add a new tag to the video id
  - ```updatePlays``` to increment the video's play count by 1
  - ```removeTag``` to remove a tag from the video id
  
- Client
  - ```getRecommendations```
      POST data:
  
      ```
      JSON.stringify({
            query: `
            {
              getRecommendations(videoId:${id}) {
                author,
                thumbnail,
                title
                # also available: plays, id
              }
            }
          `,
          })
       ```

      sample response body:
      
      ```
      { data: { getRecommendations : [ 
        { author: "Aubrey"
        thumbnail: "https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-730513610105/images/33.jpg"
        title: "miotics sl" },
        { author: "Beck"
        thumbnail: "https://s3-us-west-1.amazonaws.com/elasticbeanstalk-us-west-1-730513610105/images/74.jpg"
        title: "xie willia" }
        ...
        ] } }
      ```
      
  - ```addTag```
      POST data:
  
      ```
      JSON.stringify({
            query: `
            {
              addTag(videoId:${id}, tagWord:${word}) {
                word
              }
            }
          `,
          })
       ```

      sample response body:
      
      ```
      { data: { addTag: { word: "avocado" } } }
      ```
      
  - ```updatePlays```
      POST data:
  
      ```
      JSON.stringify({
            query: `
            {
              updatePlays(videoId:${id}) {
                author,
                title,
                # also available: thumbnail, plays, id
              }
            }
          `,
          })
       ```

      sample response body:
      
      ```
      { data: { updatePlays: { author: ""brendadixon", title: "rd on it meh" } } }
      ```
      
   - ```removeTag```
      POST data:
  
      ```
      JSON.stringify({
            query: `
            {
              removeTag(videoId:${id}, tagWord:${word}) {
                word
              }
            }
          `,
          })
       ```

      sample response body:
      
      ```
      { data: { removeTag: { word: "avocado" } } }
      ```
      
## Implementations
- Server: both can be connected to either MySQL or Neo4j
  - Express
  - Apollo-GraphQL-Express

- DB
  - MySQL
  - Neo4j: query via either HTTP or Driver
  
- Others
  - [Kanban board](https://github.com/orgs/sdc-windsor/projects/2)

## Related Projects
- Client-side legacy code by philxavier: https://github.com/rpt11-spider-n-sleet/felipe-service
  
