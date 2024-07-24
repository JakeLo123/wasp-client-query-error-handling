import { type Task } from "wasp/entities";
import { HttpError } from "wasp/server";
import { type GetTasks } from "wasp/server/operations";

//Using TypeScript's new 'satisfies' keyword, it will infer the types of the arguments and return value
export const getTasks = ((_args, context) => {
  throw new HttpError(500, "Something went wrong");
}) satisfies GetTasks<void, Task[]>;
