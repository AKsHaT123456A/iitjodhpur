const router = require("express").Router();
const express = require("express");
const pdf = require("html-pdf");
const expressLayouts = require("express-ejs-layouts");
const dynamicResume = require("../docs/dynamic-resume");
const staticResume = require("../docs/static-resume");

const options = {
  height: "10.5in", 
  width: "8in", 
};

router.get("/", (req, res, next) => {
  res.render("home");
});

router.get("/resume-maker/:theme", (req, res, next) => {
  console.log("theme: ", req.params.theme);
  switch (req.params.theme) {
    case "1":
      res.render("resume-maker", { theme: "blue" });
      break;
    case "2":
      res.render("resume-maker", { theme: "green" });
      break;
    default:
      res.render("resume-maker", { theme: "green" });
      break;
  }
});

router.post("/resume-maker", (req, res, next) => {
  console.log(req.body);
  const userName = req.body.name;
  const lowercaseName = userName.toLowerCase();
  const noSpaceName = lowercaseName.replace(" ", "");
  const shortName = noSpaceName.slice(0, 10);
  console.log("short name: ", shortName);

  let themeOptions = {
    leftTextColor: "rgb(91, 88, 255)",
    leftBackgroundColor: "rgb(12, 36, 58)",
    wholeBodyColor: " rgb(183, 182, 255)",
    rightTextColor: "rgb(12, 36, 58)",
  };

  if (req.body.theme === "blue") {
    // HTML TO PDF CONVERTING
    pdf
      .create(dynamicResume(req.body, themeOptions), options)
      .toFile(
        __dirname + "/docs/" + shortName + "-resume.pdf",
        (error, response) => {
          if (error) throw Error("File is not created");
          console.log(response.filename);
          res.sendFile(response.filename);
        }
      );
  } else if (req.body.theme === "green") {
    themeOptions = {
      leftTextColor: "rgb(183, 217, 255)",
      leftBackgroundColor: "rgb(0, 119, 89)",
      wholeBodyColor: " rgb(rgb(139, 247, 205))",
      rightTextColor: "rgb(0, 119, 89)",
    };

    // HTML TO PDF CONVERTING
    pdf
      .create(dynamicResume(req.body, themeOptions), options)
      .toFile(
        __dirname + "/docs/" + shortName + "-resume.pdf",
        (error, response) => {
          if (error) throw Error("File is not created");
          console.log(response.filename);
          res.sendFile(response.filename);
        }
      );
  } else {
    // SETTING DEFAULT VALUE
    // HTML TO PDF CONVERTING
    pdf
      .create(dynamicResume(req.body, themeOptions), options)
      .toFile(
        __dirname + "/docs/" + shortName + "-resume.pdf",
        (error, response) => {
          if (error) throw Error("File is not created");
          console.log(response.filename);
          res.sendFile(response.filename);
        }
      );
  }
});

router.get("/pdf-static-resume", (req, res, next) => {
  // HTML TO PDF CONVERTING
  pdf
    .create(staticResume(), options)
    .toFile(__dirname + "/docs/static-resume.pdf", (error, response) => {
      if (error) throw Error("File is not created");
      console.log(response.filename);
      res.sendFile(response.filename);
    });
});

router.get("/download-pdf", (req, res, next) => {
  const filePath = __dirname + "/docs/static-resume.pdf";
  res.download(filePath);
});
module.exports = router;
