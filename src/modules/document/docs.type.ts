import { z } from "zod";
import { documentUploadSchema } from "./docs.schema";


export type DocumentUploadInput = z.infer<typeof documentUploadSchema>;
