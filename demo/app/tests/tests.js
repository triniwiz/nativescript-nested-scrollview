var NestedScrollview = require("nativescript-nested-scrollview").NestedScrollview;
var nestedScrollview = new NestedScrollview();

describe("greet function", function() {
    it("exists", function() {
        expect(nestedScrollview.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(nestedScrollview.greet()).toEqual("Hello, NS");
    });
});