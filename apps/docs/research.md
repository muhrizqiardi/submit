## References and Inspiration

[Hackernews](https://news.ycombinator.com) is the direct inspiration of this project. This project will also take an inspiration from [reddit](https://reddit.com).

## Entities

```mermaid
erDiagram
  User {
    uuid id PK
    datetime createdAt
    datetime updatedAt
    string username
    string email
    string bio
    uuid roleId FK
  }
  Role {
    int id PK
    string name
  }
  Role ||--o{ User: haveMany
  Post {
    uuid id PK
    datetime createdAt
    datetime updatedAt
    uuid authorId FK
    string title
    string content
  }
  User ||--o{ Post: haveMany
  Reply {
    uuid id PK
    datetime createdAt
    datetime updatedAt
    string content
    uuid userId FK
  }
  User ||--O{ Reply: hasMany
  RepliesOnPost {
    uuid id PK
    uuid parentPostId FK
    uuid childReplyId FK
  }
  Post |o--o{ RepliesOnPost: haveMany
  RepliesOnPost }o--o| Reply: hasOne
  RepliesOnReply {
    uuid id PK
    uuid parentReplyId FK
    uuid childReplyId FK
  }
  Reply |o--o{ RepliesOnReply: haveMany
  RepliesOnReply }o--o| Reply: hasOne 
```
