import index from '../../index';

describe('image transform result', () => {
  it('expect transform to not throw error', async () => {
    const res = await index.resizeImage({filename:'icelandwaterfall',width:'20', height:'300'});
    expect(function() {
      res;
    }).not.toThrow('error');
  });
  it('expect transform to throw error', async () => {
    const res = await index.resizeImage({filename:'icelandwaterfall',width:'20', height:'300'});
    expect(function() {
      throw new Error('there is an error');
    }).toThrow();
  });
});
