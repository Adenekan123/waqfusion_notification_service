import { Socket } from "socket.io";
import request from "../lib/axios";

interface payload {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: number;
  };
  accesToken: string;
}
interface IcheckoutPayload extends payload {
  message: string;
}
interface IReadNotificationPayload extends payload {
  notificationid: string;
}

export async function onUserLoggedIn(payload: payload, socket: Socket) {
  // console.log(payload,"=====");
  const { user, accesToken } = payload;
  if (!user || !accesToken) return;
  console.log(user, accesToken);
  try {
    const response = await request.get("/auth/user/notification", {
      headers: {
        Authorization: "Bearer " + accesToken,
      },
    });
    if (response.status >= 200) {
      socket.emit("notification", response.data);
    } else {
      console.log(2);
      throw new Error(response.data);
    }
  } catch (err) {
    console.log(err);
    console.log(3);
  }
}
export async function onUserCheckout(
  payload: IcheckoutPayload,
  socket: Socket
) {
  // console.log(payload,"=====");
  const { message, user, accesToken } = payload;
  if (!message || !accesToken || !user) return;
  console.log(message, accesToken);
  try {
    const response = await request.post(
      "/auth/user/notification",
      { userId: user.id, message },
      {
        headers: {
          Authorization: "Bearer " + accesToken,
        },
      }
    );
    if (response.status >= 200) {
      socket.emit("notification", response.data.notifications);
    } else {
      console.log(2);
      throw new Error(response.data);
    }
  } catch (err) {
    console.log(err);
    console.log(3);
  }
}
export async function onNotificationRead(
  payload: IReadNotificationPayload,
  socket: Socket
) {
  console.log(payload, "=====");
  const { notificationid, user, accesToken } = payload;
  if (!notificationid || !accesToken || !user) return;
  try {
    const response = await request.patch(
      "/auth/user/notification",
      {
        notificationid,
      },
      {
        headers: {
          Authorization: "Bearer " + accesToken,
        },
      }
    );
    if (response.status >= 200) {
      socket.emit("notification", response.data.notifications);
    } else {
      console.log(2);
      throw new Error(response.data);
    }
  } catch (err) {
    console.log(err);
    console.log(3);
  }
}
