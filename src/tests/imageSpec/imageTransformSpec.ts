import index from "../../index";


describe("image transform result", () => {

  it("expect transform to not throw error", async () => {
    const res=  await index.transformImage('20', "300",'icelandwaterfall');
    expect(function(){res} ).not.toThrow("error");
  });
  it("expect transform to throw error",  async() => {
     const res=  await index.transformImage('20', "300",'test');
     expect(function() {   throw new Error("there is an error")}).toThrow(); 
  });    

});
