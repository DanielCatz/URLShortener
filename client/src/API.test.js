// App.test.js
import API from "./pages/business/api";
import axios from "axios";
describe("Insert Incomplete link row for google.com", () => {
  test("gime object yo", () => {
    expect.assertions(1);
    return (
      API.InsertIncompleteUrlEntry("google.com")
        // axios.post("http://localhost:3001/api/shorten/", {
        //     url: "google.com"
        //   })
        .then(res => expect(res.data).toBe({}))
    );
  });
});
