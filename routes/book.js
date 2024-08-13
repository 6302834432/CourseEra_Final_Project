import { Router } from "express";
import * as bookControllers from "../controllers/book.js";

const router = Router();

router.get("/books", bookControllers.getAllBooks);
router.get("/books/byISBN/:ISBN", bookControllers.getBooksByISBN);
router.get("/books/byTitle/:title", bookControllers.getBooksByTitle);
router.get("/books/byAuthor/:author", bookControllers.getBooksByAuthor);
router.post("/Addbook", bookControllers.addBook);



export default router;