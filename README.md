<h1 align="center">
    Getir Case Study
</h1>

<p align="center">
  <img src="https://cdn.getir.com/marketing/Getir_Logo_1621812382342.png" alt="getirLogo" style="width:200px; height:200px"/>
</p>

# Description

A RESTful API with a single endpoint that fetches the data in the provided MongoDB collection and return the results in the requested format

# Deployed URL

> URL: https://getir-case-study.herokuapp.com/

> Endpoint : POST /api/v1/records

# Installation

```Bash
git clone https://github.com/burakkisacik/getir-nodejs-bootcamp-graduation-assignment-burakkisacik-Private.git
```

```Bash
 cd into the folder
 npm install
 npm run dev
```

# Run Tests

```Bash
npm test
```

## Test Suites

- given request payload is in desired format
- given request payload is in desired format but not match to any records
- given request payload's date format is wrong
- given request payload's count range format is wrong
- given request payload has extra fields
- given request payload has missing fields

# Example DB Schema

<p align="center">
  <img src="resources/dbSchema.png" alt="dbSchema" style="width:200px; height:200px"/>
</p>

# Endpoints

> POST /api/v1/records

| Parameter | Type    | Description                                |
| --------- | ------- | ------------------------------------------ |
| startDate | String  | format => YYYY-MM-DD & results will be gte |
| endDate   | String  | format => YYYY-MM-DD & results will be lte |
| minCount  | Integer | results will be greater than minCount      |
| maxCount  | Integer | results will be less than maxCount         |

# How it works

## Example Request

```JavaScript
axios
  .post("https://getir-case-study-burakkisacik.herokuapp.com/api/v1/records", {
    startDate: "2015-01-01",
    endDate: "2016-01-01",
    minCount: 0,
    maxCount: 10,
  })
  .then((response) => {
    console.log(response.data);
  });
```

## Example Response

```JavaScript
{
  code: 0,
  msg: 'success',
  records: [
    {
      key: 'nYYhzbmi',
      createdAt: '2015-11-17T03:03:18.052Z',
      totalCount: 4
    }
  ]
}
```

# Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- Jest & Supertest
- Winston & Morgan
- Cors, helmet, xss-clean, hpp, express-mongo-sanitize
- Colors
- dotenv
