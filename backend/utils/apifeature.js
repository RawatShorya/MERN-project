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
}

module.exports = ApiFeatures;
