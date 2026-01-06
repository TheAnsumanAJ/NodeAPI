import { app } from "./app.js";
import { connectDb } from "./features/database.js";

connectDb();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
