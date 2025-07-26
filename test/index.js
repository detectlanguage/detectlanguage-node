import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import DetectLanguage from '../src';

chai.use(chaiAsPromised);

let detectLanguage;
let emitWarningSpy;

beforeEach(() => {
  detectLanguage = new DetectLanguage(process.env.DETECTLANGUAGE_API_KEY || '');
  emitWarningSpy = sinon.spy(process, 'emitWarning');
});

afterEach(() => {
  emitWarningSpy.restore();
});

describe('detect', () => {
  it('detects language', async () => {
    const result = await detectLanguage.detect('labas rytas');

    expect(result[0].language).to.eq('lt');
    expect(result[0].score).to.be.a('number');
  });

  it('detects language', async () => {
    detectLanguage = new DetectLanguage('invalid');

    await expect(detectLanguage.detect('hello')).to.be.rejectedWith('Invalid API key');
  });

  it('works with batch', async () => {
    const result = await detectLanguage.detect(['šešios žąsys', 'Strč prst skrz krk']);

    expect(emitWarningSpy.calledOnce).to.be.true;
    expect(result[0][0].language).to.eq('lt');
    expect(result[1][0].language).to.eq('cs');
  });
});

describe('detectBatch', () => {
  it('works with batch', async () => {
    const result = await detectLanguage.detectBatch(['šešios žąsys', 'Strč prst skrz krk']);

    expect(result[0][0].language).to.eq('lt');
    expect(result[1][0].language).to.eq('cs');
  });
});

describe('detectCode', () => {
  it('detects language code', async () => {
    const result = await detectLanguage.detectCode('vidur prūdo bliūdas plūdur');

    expect(result).to.eq('lt');
  });

  it('handles not detected', async () => {
    const result = await detectLanguage.detectCode(' ');

    expect(result).to.be.a('null');
  });
});

describe('languages', () => {
  it('fetches languages', async () => {
    const result = await detectLanguage.languages();

    expect(result[0].code).to.be.a('string');
    expect(result[0].name).to.be.a('string');
  });
});

describe('userStatus', () => {
  it('fetches user status', async () => {
    const result = await detectLanguage.userStatus();

    expect(emitWarningSpy.calledOnce).to.be.true;
    expect(result.status).to.be.a('string');
    expect(result.requests).to.be.a('number');
  });
});
