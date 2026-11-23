const assert = require("assert");
const { validateRegistration } = require("../validators/registrationValidator");

const future = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
const valid = {
  name: "Gaurav Patil", email: "gaurav@example.com", phone: "9876543210",
  prn: "202401100049", year: "2", department: "Computer",
  workshop: "Web Development", date: future, comments: "Excited to attend!",
};

const cases = [
  ["Valid submission", {}, null],
  ["Empty name", { name: "" }, "name"],
  ["Invalid name", { name: "12345" }, "name"],
  ["Short name", { name: "AB" }, "name"],
  ["Empty email", { email: "" }, "email"],
  ["Invalid email", { email: "example@" }, "email"],
  ["Invalid phone", { phone: "12345" }, "phone"],
  ["Phone starting with 1", { phone: "1234567890" }, "phone"],
  ["Invalid PRN", { prn: "123" }, "prn"],
  ["Year too high", { year: "9" }, "year"],
  ["Year negative", { year: "-1" }, "year"],
  ["Missing department", { department: "" }, "department"],
  ["Tampered department", { department: "Hacking" }, "department"],
  ["Missing workshop", { workshop: "" }, "workshop"],
  ["Past date", { date: "2020-01-01" }, "date"],
  ["Empty date", { date: "" }, "date"],
  ["Long comments", { comments: "x".repeat(301) }, "comments"],
];

let pass = 0;
for (const [label, override, field] of cases) {
  const r = validateRegistration({ ...valid, ...override });
  if (field === null) assert.ok(r.isValid, label);
  else assert.ok(r.errors[field], label + " should error on " + field);
  console.log("PASS -", label);
  pass++;
}
console.log(`\n${pass}/${cases.length} tests passed`);
