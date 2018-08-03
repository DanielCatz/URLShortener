// App.test.js
import API from "./pages/business/api";
import axios from "axios";

// describe("Insert Incomplete link row for google.com", () => {
//   test("That the short Url is null and origurl is google.com", () => {
//     expect.assertions(1);
//     return API.InsertIncompleteUrlEntry("google.com").then(res =>
//       expect(res.data).toEqual({ insertId: 6, success: true })
//     );
//   });
// });

describe("Insert Incomplete link row for google.com", () => {
  test("2nd That the short Url is null and origurl is google.com", () => {
    expect.assertions(1);
    return API.InsertIncompleteUrlEntry("google.com").then(() => {
      return API.GetLinkRow(1).then(res =>
        expect(res.data).toEqual({
          success: true,
          row: {
            id: 1,
            origurl: "google.com",
            shorturl: null
          }
        })
      );
    });
  });
});

describe("Update Incomplete link row for google.com", () => {
  test("will set the origurl", () => {
    expect.assertions(1);
    return API.UpdateShortenedUrl(1, "2").then(() => {
      return API.GetLinkRow(1).then(res =>
        expect(res.data).toEqual({
          success: true,
          row: {
            id: 1,
            origurl: "google.com",
            shorturl: "2"
          }
        })
      );
    });
  });
});
