const { remove } = require("../models/productModel");

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query; //It is everything after ? in link
    this.queryStr = queryStr; // Ex https://......?keyword=samosa, samosa is queryStr, and keyword=samosa is query
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //suppose we find samosa then this statement will find all things which has samosa in its name
            $options: "i", // This makes the filter case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr }; //We us spread operator which helps to make a copy rather then passing the value by reference
    //Removing some fields for category
    const removeFields = ["keywords", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    //Filter For Pricing And Rating
    let queryStr = JSON.stringify(queryCopy); //queryCopy is an object
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
