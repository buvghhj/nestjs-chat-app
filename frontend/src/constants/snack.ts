import { makeVar } from "@apollo/client";
import { ISnackMessage } from "../interfaces/snack-message.interface";

export const snackVar = makeVar<ISnackMessage | undefined>(undefined) 