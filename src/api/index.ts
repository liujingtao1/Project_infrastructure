import { http } from "/@/utils/http";
import { getUserInfoType } from "./types";

export const getUserInfo = (params: getUserInfoType) =>
  http.get("/user/info", { params });
