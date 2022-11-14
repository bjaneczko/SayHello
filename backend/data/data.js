const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Smith",
        email: "john@example.com",
      },
      {
        name: "Bart",
        email: "bart@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd1",
    chatName: "John Smith",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest User",
        email: "guest@example.com",
      },
      {
        name: "Bart",
        email: "bart@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd2",
    chatName: "Guest User",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Anthony",
        email: "anthony@example.com",
      },
      {
        name: "Bart",
        email: "bart@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd3",
    chatName: "Anthony",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Smith",
        email: "john@example.com",
      },
      {
        name: "Bart",
        email: "bart@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jane Doe",
        email: "jane@example.com",
      },
      {
        name: "Bart",
        email: "bart@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Jane Doe",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Smith",
        email: "john@example.com",
      },
      {
        name: "Bart",
        email: "bart@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150016472c77",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
];

module.exports = { chats };
