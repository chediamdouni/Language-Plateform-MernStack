const { StreamChat } = require("stream-chat");

const streamClient = () => {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  return StreamChat.getInstance(apiKey, apiSecret, { browser: false });
};

const getStreamToken = (user) =>
  streamClient().createToken(user._id.toString());

const syncUser = async ({ _id, username }) => {
  await streamClient().upsertUser({
    name: username,
    id: _id.toString(),
  });
};

const syncUsers = async (users) => {
  users.forEach(syncUser);
};

module.exports = {
  getStreamToken,
  syncUser,
  syncUsers,
};
