const filterByTerm = require("../filterByTerm");

//this function is to check our apis

describe("Filter function to admin id and role ", () => {
    test("ID and Role checking testing", () => {
        const input = [
            { id: 1, role: "admin" },
            { id: 2, role: "editor" },
            { id: 3, role: "actor" }
        ];

        const output = [{ id: 1, role: "admin" }];

        expect(filterByTerm(input, "admin")).toEqual(output);

        // expect(filterByTerm1(input, "LINK")).toEqual(output); // New test
    });
});