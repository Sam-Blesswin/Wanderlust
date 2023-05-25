//closure concept with example reference
/*
const outerFunction = (outerValue) => {
  return (innerValue) => {
    console.log(`Outer value: ${outerValue}`);
    console.log(`Inner value: ${innerValue}`);
  };
};

const innerFunction = outerFunction('Hello');
innerFunction('World');

output:
Outer value: Hello
Inner value: World
*/

//closure concept usecase
// eslint-disable-next-line arrow-body-style
module.exports = (fn) => {
  //fn = outervalue
  //(req,res,next) = innervalue
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
