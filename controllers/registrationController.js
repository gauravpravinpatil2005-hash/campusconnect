const { validateRegistration, DEPARTMENTS, WORKSHOPS } = require("../validators/registrationValidator");

exports.showForm = (req, res) => {
  res.render("index", { errors: {}, formData: {}, departments: DEPARTMENTS, workshops: WORKSHOPS });
};

exports.submitRegistration = (req, res) => {
  const { errors, values, isValid } = validateRegistration(req.body);
  if (!isValid) {
    return res.status(400).render("index", {
      errors,
      formData: values,
      departments: DEPARTMENTS,
      workshops: WORKSHOPS,
    });
  }
  res.render("success", { registration: values });
};
