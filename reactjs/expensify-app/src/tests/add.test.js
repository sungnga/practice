const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`

test('should add two numbers', () => {
    const result = add(3, 4);
    expect(result).toBe(7)

    // if (result !== 7) {
    //     throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`)
    // }
});

test('generate greeting from name', () => {
    const greeting = generateGreeting('Andrew');
    expect(greeting).toBe('Hello Andrew!')
})

test('should generate greet for no name', () => {
    const greeting = generateGreeting();
    expect(greeting).toBe('Hello Anonymous!')
})