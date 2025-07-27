import { app } from "./app";
import { PORT } from "./shared/config/env";

try {
  app.listen(PORT, () => {
    console.log(`Listening to PORT : ${PORT}`);
  });
} catch (error) {
  console.log("Can't start server", error);
}
