class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1A) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    console.log(queryObj);

    //1B) Advance Filtering
    //req.query : {difficulty : 'easy', duration : {gte : 5}}
    //mongoose query : {difficulty : 'easy', duration : {$gte : 5}}
    //gte, gt, lte, lt

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr)); //return a query
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      //eg : sort('price ratingsAverage')
      //console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); //to sort it based on when it was created, latest at the top
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      //eg : select('name duration price')
      //console.log(fields);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //to exclude the __v field //'- fieldname' to exclude a field
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; //page=3 or by default page=1
    const limit = this.queryString.limit * 1 || 100; //limit=10 or by default limit=100

    //skip(10) : skip the first 10 documents
    const skip = (page - 1) * limit; //if page=3 then skip the first 20 documents

    //page=3&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
