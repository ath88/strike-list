var getItem = require("../../../../server/lib/endpoints/items/getItem.js");

describe("getItem", () => {
    it("works", () => {
        var item = { name: "Beer", price: 1000 };
        var req = {
            log: {
                info: jasmine.createSpy("req.log.info"),
                warn: jasmine.createSpy("req.log.warn"),
                error: jasmine.createSpy("req.log.error")
            },
            item: item
        };

        var res = {
            status: jasmine.createSpy("res.status").and.callFake(function() {
                return res;
            }),
            send: jasmine.createSpy("res.send").and.callFake(function() {
                return res;
            })
        };

        getItem(req, res);

        expect(req.log.info).toHaveBeenCalled();
        expect(req.log.warn).not.toHaveBeenCalled();
        expect(req.log.error).not.toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ item: item });
    });
});
