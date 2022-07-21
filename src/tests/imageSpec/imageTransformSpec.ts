import index from "../../index";


describe("image transform result", () => {
  it("gets the sharp test", async () => {
      await index.transformImage('20', "300",'test').then(data=>{
        expect(function(){
            index.transformImage('20', "300",'test')
        }).not.toThrowError("error ");
      },error=>{
        expect(function(){
            index.transformImage('20', "300",'test')
        }).toThrow(error);
      })

  });
});
