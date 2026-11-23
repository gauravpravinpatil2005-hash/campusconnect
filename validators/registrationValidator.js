const DEPARTMENTS = ["Computer", "IT", "Mechanical", "Electronics", "Civil"];
const WORKSHOPS = ["Web Development", "Data Science", "Cyber Security", "Cloud Computing", "AI & ML"];

function validateRegistration(data) {
  const errors = {};
  const v = {
    name: String(data.name || "").trim(),
    email: String(data.email || "").trim(),
    phone: String(data.phone || "").trim(),
    prn: String(data.prn || "").trim(),
    year: String(data.year || "").trim(),
    department: String(data.department || "").trim(),
    workshop: String(data.workshop || "").trim(),
    date: String(data.date || "").trim(),
    comments: String(data.comments || "").trim(),
  };

  if (!v.name) errors.name = "Name is required.";
  else if (v.name.length < 3) errors.name = "Name must be at least 3 characters.";
  else if (!/^[A-Za-z ]+$/.test(v.name)) errors.name = "Name can contain only letters and spaces.";

  if (!v.email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) errors.email = "Please enter a valid email address.";

  if (!v.phone) errors.phone = "Phone number is required.";
  else if (!/^[6-9]\d{9}$/.test(v.phone)) errors.phone = "Phone must be 10 digits and start with 6-9.";

  if (!v.prn) errors.prn = "PRN is required.";
  else if (!/^\d{12}$/.test(v.prn)) errors.prn = "PRN must be exactly 12 digits.";

  if (!v.year) errors.year = "Year is required.";
  else if (!/^\d+$/.test(v.year) || Number(v.year) < 1 || Number(v.year) > 4) errors.year = "Year must be between 1 and 4.";

  if (!v.department) errors.department = "Please select a department.";
  else if (!DEPARTMENTS.includes(v.department)) errors.department = "Invalid department selected.";

  if (!v.workshop) errors.workshop = "Please select a workshop.";
  else if (!WORKSHOPS.includes(v.workshop)) errors.workshop = "Invalid workshop selected.";

  if (!v.date) errors.date = "Workshop date is required.";
  else {
    const d = new Date(v.date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(d.getTime())) errors.date = "Please enter a valid date.";
    else if (d < today) errors.date = "Date cannot be in the past.";
  }

  if (v.comments.length > 300) errors.comments = "Comments cannot exceed 300 characters.";

  return { errors, values: v, isValid: Object.keys(errors).length === 0 };
}

module.exports = { validateRegistration, DEPARTMENTS, WORKSHOPS };
