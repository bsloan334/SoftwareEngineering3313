function getBook(req, res, next) {
  if (Object.keys(query).length > 0) {
    db.query(
      'Select * from public."books" where title=$1',
      [req.query.title],
      (err, data) => {
        if (err) {
          return next(err);
        }
        res.send(data.rows);
      }
    ) ||
      db.query(
        'Select * from public."books" where isbn=$1',
        [req.query.isbn],
        (err, data) => {
          if (err) {
            return next(err);
          }
          res.send(data.rows);
        }
      ) ||
      db.query(
        'Select * from public."books" where author=$1',
        [req.query.author],
        (err, data) => {
          if (err) {
            return next(err);
          }
          res.send(data.rows);
        }
      );
  }
}

function getAllBooks(req, res, next) {
  db.query('Select * from public."books"', [], (err, data) => {
    if (err) {
      return next(err);
    }
    res.send(data.rows);
  });
}

function createBook(req, res, next) {
  const { book_id, author, title, isbn, rented } = req.body;
  db.query(
    'Insert into "books"(book_id, author, title, isbn, rented, owner)' +
      "values(${book_id}, ${author}, ${title}, ${isbn}, ${rented})",
    req.body,
    (err, data) => {
      if (err) {
        return next(err);
      }
      res.send(data.rows);
    }
  );
}

module.exports = {
  createBook,
  getAllBooks,
  getBook
};
