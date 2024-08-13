// data.js

export const books = [
    { ISBN: "978-3-16-148410-0", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { ISBN: "978-0-7432-7356-5", title: "To Kill a Mockingbird", author: "Harper Lee" },
    { ISBN: "978-1-86197-876-9", title: "1984", author: "George Orwell" },
    { ISBN: "978-0-452-28423-4", title: "Brave New World", author: "Aldous Huxley" },
    { ISBN: "978-0-374-15934-0", title: "The Catcher in the Rye", author: "J.D. Salinger" },
    { ISBN: "978-0-14-118776-1", title: "Fahrenheit 451", author: "Ray Bradbury" },
    { ISBN: "978-0-06-112008-4", title: "The Road", author: "Cormac McCarthy" },
    { ISBN: "978-1-5011-7688-7", title: "The Goldfinch", author: "Donna Tartt" }
];

export const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' }
];

export const reviews = [
    { user: 'user1', book: '978-3-16-148410-0', review_text: 'Amazing book!' },
    { user: 'user2', book: '978-0-7432-7356-5', review_text: 'Interesting read.' },
    { user: 'user3', book: '978-1-86197-876-9', review_text: 'Very insightful.' }
];
