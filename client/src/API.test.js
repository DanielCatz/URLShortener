// App.test.js
import API from "./pages/business/api";
import axios from "axios";

describe("Insert Incomplete link row for google.com", () => {
  test("That the short Url is null and origurl is google.com", () => {
    expect.assertions(1);
    API.InsertIncompleteUrlEntry("google.com").then(
      API.GetLinkRow(7).then(res =>
        expect(res.data).toEqual({ id: 7, origurl: "google.com", shorturl: "" })
      )
    );
  });
});
