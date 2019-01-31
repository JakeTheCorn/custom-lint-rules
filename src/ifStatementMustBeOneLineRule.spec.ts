import {getFixedResult, helper} from './lintRunner'

const rule = 'if-statements-must-be-one-line';

describe('Rule: if-statements-must-be-one-line', () => {
    it('should not fail if the if statement block is only one line long', () => {
        let src = `
        // some other stuff
        if () {
          // something
        }`;
        const result = helper({ src, rule })
        expect(result.errorCount).toBe(0)
    });

    it('should fail if the if statement block is more than one line long', () => {
        let src = `
        // other stuff
        switch () {
            // blah blah
            case 'Derp':
                return 'heyyyyy'
            default:
        }

        if () {
          // something
          // another thing
        }`;
        const result = helper({ src, rule })
        expect(result.errorCount).toBe(1)
    });

    // it(`testing not failure example`, () => {
    //     const src = `console.log(1);`;
    //     const result = helper({src, rule});
    //     expect(result.errorCount).toBe(0);
    // });

    // it(`testing position example`, () => {
    //     const src = `debugger;`;
    //     const startPosition = src.indexOf('debugger;');
    //     const endPosition = startPosition + 'debugger;'.length;
    //     const failure = helper({src, rule}).failures[0];

    //     expect(failure.getStartPosition().getPosition()).toEqual(startPosition);
    //     expect(failure.getEndPosition().getPosition()).toEqual(endPosition);
    //     expect(failure.getFailure()).toBe(Rule.FAILURE_STRING);
    // });

    // it(`testing failure message example`, () => {
    //     const src = `debugger;`;
    //     const failure = helper({src, rule}).failures[0];

    //     expect(failure.getFailure()).toBe(Rule.FAILURE_STRING);
    // });

    // it('testing fixer example', () => {
    //     const src = `debugger;`;
    //     const output = ``;

    //     const result = helper({src, rule});
    //     expect(result.errorCount).toBe(1);
    //     expect(getFixedResult({src, rule})).toEqual(output);
    // });
});
