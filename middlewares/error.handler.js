const errorHandler = (err, req, res, next) => {
  switch (err.type) {
    case 'database':
      console.log('database error');
      res.status(500).send('database error');
      break;
    default:
      res.status(500).send({ error: err }); 
  }
};

export default errorHandler;
