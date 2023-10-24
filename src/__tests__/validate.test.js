import { definePaymentSystem, validateCardNumber } from "../js/cardwidget/validate";

const cards = [['4716673686060766', 'visa', true],
                ['4929845038941595', 'visa', true ],
                ['5181019574702296', 'mastercard', true],
                ['6200000000000070', 'unionpay', true ],
                ['2201382000000013', 'mir', true ],
                ['4716673686060761', 'visa', false ],
                ['1116673686060761', false, false ],
                ]
test.each(cards)('testing definePaymentSystem function number %i and name %s', (number, name) => {
    const result = definePaymentSystem(number);
    expect(result).toBe(name);
});

test.each(cards)('testing validateCardNumber function number %i, name %s and result %s', (number, _, res) => {
    const result = validateCardNumber(number);
    expect(result).toBe(res);
});


