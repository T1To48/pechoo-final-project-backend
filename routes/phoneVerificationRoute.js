import express from "express";
import axios from "axios";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

const sendCodeToEmail = asyncHandler(async (req, res, next) => {
  const { userEmail } = req.params;

  let verfiCode = Math.floor(Math.random() * 9999) + 1000;
  const options = {
    method: "POST",
    url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "76ec758f96msh91f1b342af0b0e3p17a99djsn07bd79fa597b",
      "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
    data: `{"personalizations":[{"to":[{"email":"${userEmail}"}],"subject":"Pechoo-App Verfication Code"}],"from":{"email":"Pechoo-App@verfication.com"},"content":[{"type":"text/plain","value":"Your Verification CODE, ${verfiCode}"}]}`,
  };

  axios
    .request(options)
    .then(() => {
      res.status(200).json({
        userEmail: userEmail,
        verficationCode: verfiCode,
      });
    })
    .catch(function (error) {
      next(new Error(error));
    });
});

router.post("/:userEmail", sendCodeToEmail);
export default router;
