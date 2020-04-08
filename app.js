const express = require("express");

const app =  express();

// for processing JSON:
app.use(express.json());

// for processing forms:
app.use(express.urlencoded({ extended: true }));



app.get("/mean", function(req,res){
  let query = req.query.nums.split(",");
  let total = 0;
  for (let num of query) {
    total+= Number(num);
  }
  let calculatedMean = total/query.length;

  return res.json({
    operation: "mean",
    value: calculatedMean
  })
})

app.get("/median", function(req,res){
  let query = req.query.nums.split(",");
  query.sort(function(a,b){
    return a - b;
  });
  let calculatedMedian;
  let numsLen = query.length;

  if (
    numsLen % 2 === 0 // is even
) {
    // average of two middle numbers
    calculatedMedian = (query[numsLen / 2 - 1] + query[numsLen / 2]) / 2;
} else { // is odd
    // middle number only
    calculatedMedian = query[(numsLen - 1) / 2];
}

  return res.json({
    operation: "median",
    value: calculatedMedian

  })


})




app.listen(3000, function() { 
  console.log("App on port 3000");
});