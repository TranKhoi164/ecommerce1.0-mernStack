import handleException from "../../utils/handleExceptions";
import redisClient from "./redisConnection";


//expire time is second
export const saveDataToCache = async (key: string, value: string, expireTime?: number) => {
  try {
    if (expireTime) {
      await redisClient.set(key, value, {EX: expireTime})
    } else {
      await redisClient.set(key, value, {KEEPTTL: true})
    }
    return "Data is saved!";
  } catch (e: any) {
    throw new Error(e)
  }
};

export const getDataFromCache = async (key: string) => {
  try {
    const data = await redisClient.get(key);
    return data
  } catch (e: any) {
    throw new Error(e)
  }
};

export const getMultipleEntries = async (keys: Array<string>) => {
  const entries = await redisClient.mGet(keys)
  return entries
}

export const deleteDataFromCache = async (key: string) => {
  try {
    await redisClient.del(key)
  } catch (e: any) {
    throw new Error(e)
  }
}

export const updateExistingCache = async (key: string, updateData: any) => {
  let data: any = await redisClient.get(key);
  data = JSON.parse(data);
  if (key.includes("ratings")) {
    let ind = data?.findIndex((el: any) => el?._id === updateData._id);
    if (ind !== -1) data[ind] = { ...updateData };
  }
};

export const postToExistingCache = async (key: string, postData: any) => {
  let data: any = await redisClient.get(key);
  data = JSON.parse(data)
  await redisClient.set(key, JSON.stringify([...data, postData]))
};

