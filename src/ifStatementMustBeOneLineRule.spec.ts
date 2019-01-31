import {getFixedResult, helper} from './lintRunner'

const rule = 'if-statements-must-be-one-line';


const defaultIf = (
    `
    if () {
        // something
    }
    `
)

const defaultSwitch = (
    `
    switch (something) {
      case 'Derp':
        return 'YO'
    }
    `
)

const buildSrc = ({
    If = defaultIf,
    Switch = defaultSwitch,
}: {
    If?: string
    Switch?: string
} = {}) => (
    `
    'use strict';

    // comment

    ${If}

    ${Switch}
    `
)

describe('Rule: if-statements-must-be-one-line', () => {
    it('should not fail if the if statement block is only one line long', () => {
        const result = helper({ src: buildSrc(), rule })
        expect(result.errorCount).toBe(0)
    });

    it('should fail if the if statement block is more than one line long', () => {
        const If = (
            `
            if () {
              // something
              // something else  
            }
            `
        )
        const result = helper({ src: buildSrc({ If }), rule })
        expect(result.errorCount).toBe(1)
    });
});
