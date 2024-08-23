const USERS = {
  users: [
    {
      user: {
        firstName: "John",
        lastName: "Doe",
        email: "jD@example.com",
        username: "jDoe",
        bookmarks: [],
        password: "1234",
        createdAt: "2024-07-10T06:27:16.753Z",
        _id: "1",
      },
    },
    {
      user: {
        firstName: "Jane",
        lastName: "Doe",
        email: "janeD@example.com",
        username: "jaDoe",
        bookmarks: [],
        password: "1234",
        createdAt: "2024-07-10T06:27:16.753Z",
        _id: "1",
      },
    },
  ],
};

const COMMENTS = {
  comments: [
    {
      author: {
        firstName: "Jane",
        lastName: "Doe",
        username: "jaDoe",
        _id: "1",
      },
      body: "Test comment 01",
      created_at: "2024-07-27T10:21:02.011Z",
      updatedAt: "2024-07-27T10:21:02.011Z",
      isDeleted: false,
      isReply: false,
      likes: {
        users: [],
        count: 0,
      },
      post: "42",
      replies: [],
      _id: "2",
    },
  ],
};

const POSTS = {
  posts: [
    {
      author: {
        firstName: USERS.users[0].user.firstName,
        lastName: USERS.users[0].user.lastName,
        username: USERS.users[0].user.username,
        _id: USERS.users[0].user._id,
      },
      body: "hello, i am test post",
      cover: {
        cloudinary_id: "qfdwtjr1j4rcxvkrvydv",
        url: "http://res.cloudinary.com/dhtzg8kkq/image/upload/v1721979248/qfdwtjr1j4rcxvkrvydv.png",
      },
      title: "test data",
      createdAt: "2024-07-26T07:34:08.774Z",
      _id: "42",
      isPrivate: false,
      updatedAt: "2024-07-27T07:34:08.774Z",
      tags: [],
    },
  ],
};

export default {
  USERS,
  POSTS,
  COMMENTS,
};
