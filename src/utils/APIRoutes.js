// export const HOST = "http://localhost:5000";
export const HOST = "https://chat-app-server-do.herokuapp.com";

export const registerRoute = `${HOST}/user/register`;
export const loginRoute = `${HOST}/user/login`;
export const setAvatarRoute = `${HOST}/user/setAvatar`;
export const getAllContactsRoute = `${HOST}/user/all-users`;
export const sendMessageRoute = `${HOST}/messages/add-msg`;
export const getMessagesRoute = `${HOST}/messages/get-msg`;

/* avatar api */

export const apiAvatar = 'https://api.multiavatar.com';