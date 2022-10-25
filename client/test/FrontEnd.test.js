"use strict";
const { orderZA } = require("../src/components/Home");

describe("quickSort(array)", function () {
  it("Debe ordernar objeto de la Z a la A", function () {
    expect(
      orderZA([
        { name: "andres" },
        { name: "ivan" },
        { name: "miguel" },
        { name: "oscar" },
      ])
    ).toEqual([
      { name: "andres" },
      { name: "miguel" },
      { name: "ivan" },
      { name: "oscar" },
    ]);
  });
});
